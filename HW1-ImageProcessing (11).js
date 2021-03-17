//mapToGrayscale(img: Image): image
function mapToGrayscale(img){
  function func(p){
    let m = (p[0]+p[1]+p[2])/3;
    return [m,m,m];
  };
  return imageMap(img,func);
}

//mapToRed(img: Image): image
function mapToRed(img){
  function func(p){
    return [p[0],0,0];
  };
  return imageMap(img,func);
}

//imageMap(img: Image, func: (p: Pixel) => Pixel): Image
function imageMap(img,func){
  let output = img.copy();
  for(let i = 0; i < img.width; ++i){
    for(let j = 0; j < img.height; ++j){
      let p = img.getPixel(i,j);
      output.setPixel(i,j,func(p));
    }
  }
  return output;
}

//makeGrayscale(img: Image): image
function makeGrayscale(img){
  let output = img.copy();
  for(let i = 0; i < img.width; ++i){
    for(let j = 0; j < img.height; ++j){
      let p = img.getPixel(i,j);
      let m = (p[0]+p[1]+p[2])/3;
      output.setPixel(i,j, [m,m,m]);
    }
  }
  return output;
}

//removeBlueAndGreen(img: Image): image
function removeBlueAndGreen(img){
  let output = img.copy();
  for(let i = 0; i < img.width; ++i){
    for(let j = 0; j < img.height; ++j){
      let p = img.getPixel(i,j);
      output.setPixel(i,j, [p[0],0,0]);
    }
  }
  return output;
}

//highlightEdges(img: Image): image
function highlightEdges(img){
  let output = img.copy();
  for(let i = 0; i < img.width; ++i){
    for(let j = 0; j < img.height - 1; ++j){
      let p1 = img.getPixel(i,j)
      let p2 = img.getPixel(i,j + 1);
      let m1 = (p1[0] + p1[1] + p1[2])/3;
      let m2 = (p2[0] + p2[1] + p2[2])/3;
      let v = Math.abs(m1 - m2);
      output.setPixel(i,img.height-1,[0,0,0]);
      output.setPixel(i,j,[v,v,v]);
    }
  } 
  return output;
}

//blur(img: Image): image
function blur(img){
  let output = img.copy();
  for(let i = 0; i < img.width; ++i){
    for(let j = 0; j < img.height; ++j){
      output.setPixel(i,j,(vals(img,i,j)));
    }
  }
  return output;
}

//vals(img: Image, x: number, y: number): number[]
function vals(img,x,y){
  let r = 0
  let g = 0;
  let b = 0;
  let count = 0;
  for(let i = x-1; i < x+2; ++i){
    for(let j = y-1; j < y+2; ++j){
      if((i > -1 && j > -1) && (i < img.width && j < img.height)){
        let p = img.getPixel(i,j);
        r += p[0];
        g += p[1];
        b += p[2];
        ++count;
      }
    }
  }
  return([r/count,g/count,b/count]);
}

//swapGB(img: Image): image
function swapGB(img){
  function func(p){
    return([p[0],p[2],p[1]]);
  };
  return imageMap(img,func);
}

//shiftRGB(img: Image): image
function shiftRGB(img){
  function func(p){
    return([p[2],p[0],p[1]]);
  };
  return imageMap(img,func);
}

let img = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');
let bl = blur(img);
console.log(img.getPixel(img.width-1,img.height-1));
console.log(bl.getPixel(img.width-1,img.height-1));
img.show();
bl.show();

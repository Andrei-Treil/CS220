//imageMapXY(img: Image, func: (img: Image, x: number, y: number) => Pixel): Image
function imageMapXY(img, func){
  let output = img.copy();
  for(let i = 0; i < img.width; ++i){
    for(let j = 0; j < img.height; ++j){
      let p = img.getPixel(i,j);
      output.setPixel(i,j,func(img,i,j));
    }
  }
  return output;
}

//imageMask(img: Image, func: (img: Image, x: number, y: number) => boolean, maskValue: Pixel): Image
function imageMask(img, func, maskValue){
  //pixelScan(img: Image, x: number, y: number): Pixel
  function pixelScan(img, x, y){
    if(func(img,x,y)){return maskValue;}
    return img.getPixel(x,y);
  }
  return imageMapXY(img, pixelScan);
}

//blurPixel(img: Image, x: number, y: number): Pixel
function blurPixel(img, x, y){
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
  img.setPixel(x,y,[r/count,g/count,b/count]);
  return(img.getPixel(x,y));
}

//blurImage(img: Image): Image
function blurImage(img){
  return imageMapXY(img,blurPixel);
}

//blurHalfImage(img: Image, top: boolean): Image
function blurHalfImage(img, top){
  function checkHalf(img, x, y){
    if(top){return y >= img.height/2;}
    return y < img.height/2;
  }
  function appBlur(img,x,y){
    if(checkHalf(img,x,y)){return blurPixel(img,x,y);}
    return img.getPixel(x,y);
  }
  return imageMapXY(img,appBlur);
}

//isGrayish(p: Pixel): boolean
function isGrayish(p){
  let min = Math.min(p[0],p[1],p[2]);
  let max = Math.max(p[0],p[1],p[2]);
  return((max - min) <= 0.3);
}

//getGrayPixel(img: Image, x: number, y: number): Pixel
function getGrayPixel(img,x,y){
  let p = img.getPixel(x,y);
  let m = (p[0]+p[1]+p[2])/3;
  img.setPixel(x,y, [m,m,m]);
  return img.getPixel(x,y);
}

//toGrayscale(img: Image): Image
function toGrayscale(img){
  function grayScalePixel(img,x,y){
    if(isGrayish(img.getPixel(x,y))){return img.getPixel(x,y);}
    return getGrayPixel(img,x,y);
  }
  return imageMapXY(img, grayScalePixel);
}

//grayHalfImage(img: Image): Image
function grayHalfImage(img){
  function appGray(img,x,y){
    if(y >= img.height/2){
      if(isGrayish(img.getPixel(x,y))){return img.getPixel(x,y);}
      return getGrayPixel(img,x,y);
    }
    return img.getPixel(x,y);
  }
  return imageMapXY(img,appGray);
}

//saturateHigh(img: Image): Image
function saturateHigh(img){
  function saturatePixel(img,x,y){
    let p = img.getPixel(x,y);
    if(p[0] > 2/3){p[0] = 1;}
    if(p[1] > 2/3){p[1] = 1;}
    if(p[2] > 2/3){p[2] = 1;}
    img.setPixel(x,y, [p[0],p[1],p[2]]);
    return img.getPixel(x,y);
  }
  return imageMapXY(img,saturatePixel);
}

//blackenLow(img: Image): Image
function blackenLow(img){
  function blackenPixel(img,x,y){
    let p = img.getPixel(x,y);
    if(p[0] < 1/3){p[0] = 0;}
    if(p[1] < 1/3){p[1] = 0;}
    if(p[2] < 1/3){p[2] = 0;}
    img.setPixel(x,y, [p[0],p[1],p[2]]);
    return img.getPixel(x,y);
  }
  return imageMapXY(img,blackenPixel);
}

//blackenPixel(p: Pixel): Pixel
function blackenPixel(p){
  if(p[0] < 1/3){p[0] = 0;}
  if(p[1] < 1/3){p[1] = 0;}
  if(p[2] < 1/3){p[2] = 0;}
  return p;
}

//saturatePixel(p: Pixel): Pixel
function saturatePixel(p){
  if(p[0] > 2/3){p[0] = 1;}
  if(p[1] > 2/3){p[1] = 1;}
  if(p[2] > 2/3){p[2] = 1;}
  return p
}

//grayScalePixel(p: Pixel): Pixel
function grayScalePixel(p){
  if(isGrayish(p)){return p;}
  let m = (p[0]+p[1]+p[2])/3;
  p[0] = m;
  p[1] = m;
  p[2] = m;
  return p;
}

//reduceFunctions(fa: ((p: Pixel) => Pixel)[] ): ((x: Pixel) => Pixel)
function reduceFunctions(fa){
  function reducedFxn(p){return fa.reduce((p,f) => f(p),p)};
  return reducedFxn;
}



//blackenLow -> saturateHigh -> toGrayscale
//colorize(img: Image): Image
function colorize(img){
 let fa = [blackenPixel, saturatePixel, grayScalePixel];
 const rf = reduceFunctions(fa);
 return imageMap(img, rf);
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



let o = { x: 0 };
o.x = o;
o.x.x = 1;
console.log(o.x);
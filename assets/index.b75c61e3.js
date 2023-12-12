import{d as t,o as e,e as o,F as i,r,z as s,n as l,v as c,G as a,g as h,f as n,C as d,D as w}from"./vendor.2a22cd8b.js";import{_ as u}from"./cascade.7dcbadfc.js";var g=t({data:()=>({list:Object.freeze([{row:3,col:3,color:"yellow"},{row:3,col:3,color:"yellow"},{row:6,col:1},{row:3,col:3,color:"green-bottom-right"},{row:3,col:2,color:"red"},{row:3,col:2,color:"yellow"},{row:3,col:2,color:"blue"},{row:3,col:2,color:"green"},{row:3,col:2,color:"red"},{row:3,col:3,color:"yellow-bottom-left"},{row:6,col:1},{row:3,col:3,color:"blue"},{row:3,col:3,color:"blue"},{row:3,col:3,color:"yellow"},{row:3,col:3,color:"yellow"},{row:2,col:3,color:"blue"},{row:4,col:4},{row:2,col:2,color:"blue"},{row:4,col:4},{row:2,col:3,color:"blue"},{row:3,col:3,color:"blue"},{row:3,col:3,color:"blue"},{row:2,col:3,color:"yellow"},{row:2,col:2,color:"blue"},{row:2,col:3,color:"green"},{row:1,col:7},{row:1,col:7},{row:3,col:3,color:"red-bottom-right"},{row:3,col:2,color:"yellow"},{row:3,col:2,color:"blue"},{row:3,col:3,color:"green-red"},{row:2,col:4,color:"red"},{row:2,col:2,color:"blue"},{row:2,col:4,color:"red"},{row:3,col:3,color:"red-yellow"},{row:3,col:2,color:"blue"},{row:3,col:2,color:"green"},{row:3,col:3,color:"red-bottom-left"},{row:1,col:4},{row:2,col:2,color:"blue"},{row:1,col:4},{row:2,col:3,color:"green"},{row:4,col:4},{row:4,col:2,color:"green"},{row:3,col:5},{row:3,col:5},{row:4,col:2,color:"yellow"},{row:4,col:4},{row:2,col:3,color:"yellow"},{row:2,col:2,color:"blue"},{row:2,col:3,color:"blue"},{row:2,col:3,color:"blue"},{row:1,col:4},{row:4,col:4,color:"all"},{row:1,col:4},{row:2,col:3,color:"yellow"},{row:2,col:2,color:"yellow"},{row:2,col:2,color:"yellow"},{row:2,col:2,color:"yellow"},{row:2,col:2,color:"yellow"},{row:2,col:2,color:"yellow"},{row:2,col:2,color:"green"},{row:2,col:2,color:"green"},{row:2,col:2,color:"green"},{row:2,col:2,color:"green"},{row:2,col:2,color:"green"},{row:2,col:3,color:"green"},{row:2,col:3,color:"red"},{row:4,col:4},{row:4,col:2,color:"green"},{row:1,col:4},{row:1,col:4},{row:4,col:2,color:"yellow"},{row:4,col:4},{row:2,col:3,color:"red"},{row:3,col:5},{row:2,col:2,color:"red"},{row:3,col:5},{row:2,col:3,color:"green"},{row:2,col:3,color:"yellow"},{row:2,col:2,color:"red"},{row:3,col:3,color:"blue-top-right"},{row:3,col:2,color:"yellow"},{row:3,col:2,color:"red"},{row:3,col:3,color:"green-blue"},{row:1,col:4},{row:1,col:4},{row:3,col:3,color:"blue-yellow"},{row:3,col:2,color:"red"},{row:3,col:2,color:"green"},{row:3,col:3,color:"blue-top-left"},{row:2,col:4,color:"blue"},{row:2,col:2,color:"red"},{row:2,col:4,color:"blue"},{row:1,col:7},{row:2,col:3,color:"yellow"},{row:4,col:4},{row:2,col:2,color:"red"},{row:4,col:4},{row:2,col:3,color:"green"},{row:1,col:7},{row:3,col:3,color:"red"},{row:3,col:3,color:"red"},{row:6,col:1},{row:6,col:1},{row:3,col:3,color:"green"},{row:3,col:3,color:"green"},{row:2,col:3,color:"red"},{row:2,col:2,color:"red"},{row:2,col:3,color:"red"},{row:3,col:3,color:"red"},{row:3,col:3,color:"red"},{row:3,col:3,color:"green-top-right"},{row:3,col:2,color:"blue"},{row:3,col:2,color:"yellow"},{row:3,col:2,color:"red"},{row:3,col:2,color:"green"},{row:3,col:2,color:"blue"},{row:3,col:3,color:"yellow-top-left"},{row:3,col:3,color:"green"},{row:3,col:3,color:"green"}])})});const m={class:"fight-chess"};g.render=function(t,c,a,h,n,d){return e(),o("div",m,[(e(!0),o(i,null,r(t.list,((t,i)=>(e(),o("div",{style:s({gridArea:`span ${t.row||1} / span ${t.col||1}`}),class:l([t.color&&`bg-${t.color}`||"bg-none"]),key:i},null,6)))),128))])},g.__scopeId="data-v-09a7efc8";var v=t({props:{scale:{type:Number,default:1},color:{type:String,default:"#3d4051"},shadowBlur:{type:Number,default:10}},beforeCreate(){this.minuteAnimate=0,this.dandelionAnimate=0},mounted(){const t=this.canvas=this.$refs.canvas;this.ctx=t.getContext("2d"),this.size=(window.devicePixelRatio||1)/(this.ctx.backingStorePixelRatio||this.ctx.webkitBackingStorePixelRatio||this.ctx.mozBackingStorePixelRatio||this.ctx.msBackingStorePixelRatio||this.ctx.oBackingStorePixelRatio||1),this.size=Math.max(2,this.size);const e=this.$refs.canvasDiv.offsetWidth||document.body.offsetWidth;t.style.width=e+"px",t.style.height=e+"px",t.width=e*this.size,t.height=e*this.size,this.centerX=t.width/2,this.centerY=t.height/2,this.width=t.width*this.scale,this.height=t.height*this.scale,this.dandelionHeight=this.height/4,this.minuteHeight=this.dandelionHeight/8,this.minuteHandHeight=this.height/2.1,this.hourHandHeight=this.height/3.2,this.drawMinuteFive()},methods:{drawMinutePer(){const t=this.ctx,e=this.centerX,o=this.centerY,i=this.height/2;t.save(),this.minuteAnimate+=6;const r=this.minuteAnimate;r&&r%5!=0&&(t.save(),t.translate(e,o),t.strokeStyle=this.color,t.lineWidth=2,t.rotate(r/180*Math.PI),t.beginPath(),t.moveTo(0,-i),t.lineTo(0,-i+this.minuteHeight),t.stroke(),t.restore()),t.restore(),r<=390?this.requestAnimationFrame(this.drawMinutePer):(this.minuteAnimate=360,this.reDrawTime(),this.setInterval=setInterval(this.reDrawTime,1e3))},drawMinuteFive(){const t=this.ctx,e=this.centerX,o=this.centerY,i=this.height/2;this.minuteAnimate+=6;const r=this.minuteAnimate;r&&r%5==0&&(t.save(),t.translate(e,o),t.strokeStyle=this.color,t.lineWidth=1,t.rotate(r/180*Math.PI),t.beginPath(),t.moveTo(0,-i+this.minuteHeight/2),t.lineTo(0,-i+this.dandelionHeight),t.stroke(),t.restore(),this.drawDandelionPer(r/30)),r<=360?this.requestAnimationFrame(this.drawMinuteFive):(this.minuteAnimate=24,this.drawMinutePer())},drawDandelionPer(t){const e=this.ctx,o=this.minuteHeight/2,i=this.getPoints(this.centerX,this.centerY,this.height/2-o,12),{x:r,y:s}=i[t-1];e.save(),e.strokeStyle=this.color,e.lineWidth=1;const l=30*t,c=360/(t||12),a=t%2?0:c/2;if(2!==t)for(let h=0;h<360/c;h++)e.save(),e.translate(r,s),e.rotate((l+h*c-a)/180*Math.PI),e.beginPath(),e.moveTo(0,-o),e.lineTo(0,0),e.stroke(),e.restore();else e.save(),e.translate(r,s),e.rotate((l+45)/180*Math.PI),e.beginPath(),e.moveTo(0,-o),e.lineTo(0,0),e.stroke(),e.restore(),e.save(),e.translate(r,s),e.rotate((l-45)/180*Math.PI),e.beginPath(),e.moveTo(0,-o),e.lineTo(0,0),e.stroke(),e.restore();e.restore()},reDrawTime(){const t=this.getHourMinute();this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawMinute(),this.drawDandelion(),this.drawMinuteHand(t.minute),this.drawHourHand(t.hour),this.drawCenterCircle()},drawCenterCircle(){const t=this.ctx,e=this.centerX,o=this.centerY;t.save(),t.fillStyle=this.color,this.drawShadow(),t.beginPath(),t.arc(e,o,.016*this.width,0,2*Math.PI),t.fill(),t.restore()},drawMinuteHand(t){const e=this.ctx,o=this.centerX,i=this.centerY;e.save(),e.strokeStyle=this.color,e.translate(o,i),e.rotate(-Math.PI+t),e.lineWidth=6,this.drawShadow(),e.beginPath(),e.moveTo(0,.16*-this.minuteHandHeight),e.lineTo(0,.84*this.minuteHandHeight),e.stroke(),e.restore()},drawHourHand(t){const e=this.ctx,o=this.centerX,i=this.centerY;e.save(),e.strokeStyle=this.color,e.translate(o,i),e.rotate(-Math.PI+t),e.lineWidth=7,this.drawShadow(),e.beginPath(),e.moveTo(0,.16*-this.hourHandHeight),e.lineTo(0,.84*this.hourHandHeight),e.stroke(),e.restore()},drawMinute(){const t=this.ctx,e=this.centerX,o=this.centerY,i=this.height/2;t.save(),t.translate(e,o),t.strokeStyle=this.color;for(let r=0;r<360;r+=6)r&&r%5!=0?(t.save(),t.lineWidth=2,t.rotate(r/180*Math.PI),t.beginPath(),t.moveTo(0,-i),t.lineTo(0,-i+this.minuteHeight),t.stroke(),t.restore()):(t.save(),t.lineWidth=1,t.rotate(r/180*Math.PI),t.beginPath(),t.moveTo(0,-i+this.minuteHeight/2),t.lineTo(0,-i+this.dandelionHeight),t.stroke(),t.restore());t.restore()},drawDandelion(){const t=this.ctx,e=this.minuteHeight/2,o=this.getPoints(this.centerX,this.centerY,this.height/2-e,12);t.save(),t.strokeStyle=this.color,t.lineWidth=1,o.forEach((({x:o,y:i},r)=>{const s=30*(r+=1),l=360/(r||12),c=r%2?0:l/2;if(2!==r)for(let a=0;a<360/l;a++)t.save(),t.translate(o,i),t.rotate((s+a*l-c)/180*Math.PI),t.beginPath(),t.moveTo(0,-e),t.lineTo(0,0),t.stroke(),t.restore();else t.save(),t.translate(o,i),t.rotate((s+45)/180*Math.PI),t.beginPath(),t.moveTo(0,-e),t.lineTo(0,0),t.stroke(),t.restore(),t.save(),t.beginPath(),t.translate(o,i),t.rotate((s-45)/180*Math.PI),t.moveTo(0,-e),t.lineTo(0,0),t.stroke(),t.restore()})),t.restore()},drawShadow(){const t=this.ctx;t.shadowBlur=8,t.shadowOffsetX=6,t.shadowOffsetY=6,t.shadowColor="rgba(0, 0, 0, 0.6)"},drawCircle(){const t=this.ctx,e=this.centerX,o=this.centerY,i=this.height/2;t.lineWidth=1,t.beginPath(),t.arc(e,o,i,0,2*Math.PI),t.stroke()},reDraw(){360===this.minuteAnimate&&(clearInterval(this.setInterval),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.minuteAnimate=0,this.drawMinuteFive())},getHourMinute(){const t=new Date,e=t.getMinutes(),o=t.getHours(),i=t.getSeconds();return{minute:e/60*(2*Math.PI)+i/60*(Math.PI/30),hour:o%12/12*(2*Math.PI)+e/60*(Math.PI/6)}},getPoints(t,e,o,i){const r=[],s=Math.PI/180*Math.round(360/i),l=Math.floor(i/2)+1;for(let c=0;c<i;c++){const i=t+o*Math.sin(s*c),l=e+o*Math.cos(s*c);r.push({x:i,y:l})}return r.slice(0,l-1).reverse().concat(r.slice(l,i).reverse()).concat(r.slice(l-1,l))},requestAnimationFrame(t){window.requestAnimationFrame?window.requestAnimationFrame(t):setTimeout(t,1e3/60)}},beforeDestroy(){clearInterval(this.setInterval)}});const P={ref:"canvasDiv"},f={ref:"canvas"};v.render=function(t,i,r,s,l,a){return e(),o("div",P,[c("canvas",f,null,512)],512)};var y=t({props:{padding:{type:Number,default:10},width:{type:Number,default:8},color:{type:String,default:"#e7923c"},angle:{type:Number,default:280},percent:{type:Number,default:0},opacity:{type:Number,default:.3},linecap:{type:String,default:"round"},time:{type:Number,default:.3}},data:()=>({viewBoxWidth:Math.min(375,document.body.clientWidth),circlePath:{strokeDasharray:"",strokeDashoffset:""},circleFill:{strokeDasharray:"",strokeDashoffset:"",strokeLinecap:""}}),computed:{d(){const t=this.viewBoxWidth/2,e=t-this.width-this.padding;return`\n                M ${t},${t} m 0,${e}\n                a ${e},${e} 0 1 1 0,-${2*e}\n                a ${e},${e} 0 1 1 0,${2*e}\n            `},viewBox(){return`0 0 ${this.viewBoxWidth} ${this.viewBoxWidth}`}},watch:{percent(){this.setCircle()}},mounted(){this.setCircle()},methods:{setCircle(){if(void 0===this.length){const t=360-this.angle,e=this.allLength=this.$refs.circlePath.getTotalLength(),o=t/360*e,i=this.length=e-o;this.circlePath.strokeDasharray=`${i} ${o}`,this.circlePath.strokeDashoffset=-o/2,this.circleFill.strokeDasharray=`0 ${e}`,this.circleFill.strokeDashoffset=-o/2,this.circleFill.transition=`stroke-dasharray ${this.time}s ease`}this.percent>0&&(this.circleFill.strokeLinecap=this.linecap),setTimeout((()=>{const t=this.length*this.percent;this.circleFill.strokeDasharray=`${t} ${this.allLength}`,t<=0&&setTimeout((()=>{this.circleFill.strokeLinecap=""}),1e3*this.time)}))}}});const p={class:"circular-progress"},b=["viewBox"],x=["d","stroke","stroke-width","stroke-opacity","stroke-linecap"],k=["d","stroke","stroke-width"];y.render=function(t,i,r,l,h,n){return e(),o("div",p,[(e(),o("svg",{viewBox:t.viewBox},[c("path",{ref:"circlePath",d:t.d,stroke:t.color,"stroke-width":t.width,"stroke-opacity":t.opacity,"stroke-linecap":t.linecap,style:s(t.circlePath),"fill-opacity":"0"},null,12,x),c("path",{d:t.d,stroke:t.color,"stroke-width":t.width,style:s(t.circleFill),"fill-opacity":"0"},null,12,k)],8,b)),a(t.$slots,"default",{},void 0,!0)])},y.__scopeId="data-v-5992913a";var M=t({inheritAttrs:!1,props:{datas:{type:Array,default:()=>[.2,.2,.2,.2,.2]},colors:{type:Array,default:()=>["#4FBBFD","#FD642E","#8BC44C","#FFB508","#3A84FD","#FD642E"]},land:{type:Number,default:.4},rotate:{type:Number,default:30},scale:{type:Number,default:.8},activeScale:{type:Number,default:1.1},spaceColor:{type:String,default:"white"},shadowBlur:{type:Number,default:16}},data:()=>({}),computed:{ratios(){return this.countRatio(this.datas)}},beforeCreate(){this.animateSize=0,this.animateIndex=0,this.start=0,this.end=0,this.active=0},created(){},mounted(){const t=this.canvas=this.$refs.canvas;this.ctx=t.getContext("2d"),this.size=(window.devicePixelRatio||1)/(this.ctx.backingStorePixelRatio||this.ctx.webkitBackingStorePixelRatio||this.ctx.mozBackingStorePixelRatio||this.ctx.msBackingStorePixelRatio||this.ctx.oBackingStorePixelRatio||1);const e=this.$refs.canvasDiv.offsetWidth||document.body.offsetWidth;t.style.width=e+"px",t.style.height=e+"px",t.width=e*this.size,t.height=e*this.size,this.centerX=t.width/2,this.centerY=t.height/2,this.width=t.width*this.scale,this.height=t.height*this.scale,this.drawPie()},methods:{showActive(t){360===this.animateSize&&(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawShadow(),this.drawPointPies(this.getEventPosition(t)),this.drawActivePie(),this.drawSpacePie())},drawPointPies(t){const e=this.ctx,o=this.centerX,i=this.centerY,r=this.height/2;let s=0,l=0;const c=t&&this.drawSpacePie().isPointInPath(t.x,t.y);this.ratios.forEach(((a,h)=>{l=2*a*Math.PI,e.beginPath(),e.moveTo(o,i),e.fillStyle=this.colors[h],this.drawArc(o,i,r,s,l),e.closePath(),e.fill(),t&&e.isPointInPath(t.x,t.y)&&!c&&(this.active=h),s=l}))},drawActivePie(){const t=this.ctx,e=this.centerX,o=this.centerY,i=this.height/2,r=this.active-1<0?0:2*this.ratios[this.active-1]*Math.PI,s=2*this.ratios[this.active]*Math.PI;t.beginPath(),t.moveTo(e,o),t.fillStyle=this.colors[this.active],this.drawArc(e,o,i*this.activeScale,r,s),t.closePath(),t.fill()},drawPie(){this.animateSize+=6,this.end=2*Math.PI*(this.animateSize/360);const t=this.ctx,e=this.centerX,o=this.centerY,i=this.height/2;t.beginPath(),t.moveTo(e,o),t.fillStyle=this.colors[this.getPieColorIndex(this.animateSize/360)],this.drawArc(e,o,i,this.start,this.end),t.closePath(),t.fill(),this.drawSpacePie(),this.animateSize<360?(this.start=this.end-.002,this.requestAnimationFrame(this.drawPie)):(this.drawShadow(),this.drawPointPies(),this.drawActivePie(),this.drawSpacePie())},drawSpacePie(){const t=this.ctx,e=this.centerX,o=this.centerY,i=this.height/2;return t.beginPath(),t.moveTo(e,o),t.fillStyle=this.spaceColor,this.drawArc(e,o,i*(1-this.land),0,2*Math.PI),t.closePath(),t.fill(),t},drawShadow(){const t=this.ctx,e=this.centerX,o=this.centerY,i=this.height/2;t.beginPath(),t.shadowBlur=this.shadowBlur*this.size,t.shadowColor="#999999",t.fillStyle=this.spaceColor,t.arc(e,o,i,Math.PI/4,Math.PI-Math.PI/4),t.closePath(),t.fill(),t.shadowBlur=0},reDraw(){360===this.animateSize&&(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.animateSize=0,this.animateIndex=0,this.start=0,this.end=0,this.drawPie())},drawArc(t,e,o,i,r){this.ctx.arc(t,e,o,this.getAngle(i),this.getAngle(r))},countRatio(t){let e=0;return t.map((t=>e+=t))},getPieColorIndex(t){return t>this.ratios[this.animateIndex]?Math.min(this.animateIndex+=1,this.ratios.length-1):this.animateIndex},getAngle(t){return(this.rotate-90)/360*2*Math.PI+t},getEventPosition(t){const e=this.size;return{x:(t.offsetX||t.layerX)*e,y:(t.offsetY||t.layerY)*e}},requestAnimationFrame(t){window.requestAnimationFrame?window.requestAnimationFrame(t):setTimeout(t,1e3/60)}}});const S={ref:"canvasDiv"};M.render=function(t,i,r,s,l,a){return e(),o("div",S,[c("canvas",{ref:"canvas",onClick:i[0]||(i[0]=(...e)=>t.showActive&&t.showActive(...e))},null,512)],512)};var I=t({name:"Component",components:{flightChess:g,clock:v,circularProgress:y,pieChart:M,cascade:u},data:()=>({cascadeData:[{title:"1",leftChildren:[{title:"2",children:[{title:"3"},{title:"3"}]},{title:"2",children:[{title:"3"},{title:"3"}]}],rightChildren:[{title:"2",children:[{title:"3"},{title:"3"}]},{title:"2",children:[{title:"3"},{title:"3"}]}]}]})});const A=t=>(d("data-v-ac8698e6"),t=t(),w(),t),T={class:"component"},H={class:"item"},D=A((()=>c("p",{class:"title"},"飞行棋盘",-1))),F={class:"item"},C=A((()=>c("p",{class:"title"},"蒲公英时钟",-1))),B={class:"item"},$=A((()=>c("p",{class:"title"},"环形进度条",-1))),z={class:"item"},X=A((()=>c("p",{class:"title"},"环形饼图",-1))),Y={class:"item"},R=A((()=>c("p",{class:"title"},"级联树",-1))),W={class:"content"};I.render=function(t,i,r,s,l,a){const d=h("flight-chess"),w=h("clock"),u=h("circular-progress"),g=h("pie-chart"),m=h("cascade");return e(),o("section",T,[c("div",H,[D,n(d,{class:"content"})]),c("div",F,[C,n(w,{class:"content"})]),c("div",B,[$,n(u,{class:"content",percent:.8},null,8,["percent"])]),c("div",z,[X,n(g,{class:"content"})]),c("div",Y,[R,c("div",W,[n(m,{data:t.cascadeData,align:"center"},null,8,["data"])])])])},I.__scopeId="data-v-ac8698e6";export default I;

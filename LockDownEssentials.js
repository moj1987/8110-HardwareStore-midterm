const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    FOOD:   Symbol("food"),
    LITTER:   Symbol("litter"),
    EXTRAS:  Symbol("extras")
});

module.exports = class LockDownEssentials extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSpecies = "";
        this.sFood = "";
        this.sLitter = "";
        this.sExtras = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.FOOD;
                aReturn.push("Welcome to Moj's hardware Store.");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                if(sInput.toLowerCase() == "shovel"){
                  this.sSpecies = "shovel";
                }else if(sInput.toLowerCase() == "bin") {
                  this.sSpecies = "bin";
                } else {
                  this.stateCur = OrderState.WELCOMING;
                  aReturn.push("Please type SHOVEL if you want a shovel or BIN if you want a bin.");
                  break;
                }
                aReturn.push("Would you like small or large?");
                break;
            case OrderState.FOOD:
                if(this.sSpecies == "shovel"){
                  this.stateCur = OrderState.LITTER;
                  aReturn.push("Would you like furnace filter?");
                }else{
                  this.stateCur = OrderState.EXTRAS;
                  aReturn.push("Would you like car cloth?");
                }
                if(sInput.toLowerCase()!= "no"){
                  this.sFood = sInput;
                }
                break;
            case OrderState.LITTER:
                this.stateCur = OrderState.EXTRAS
                if(sInput.toLowerCase()!= "no"){
                  this.sLitter = "furnace filter";
                }
                aReturn.push("Would you like car cloth?");
                break;
            case OrderState.EXTRAS:
                if(sInput.toLowerCase() != "no"){
                    this.sExtras = sInput;
                }
                aReturn.push("Thank-you for your order of");
                this.nTotal = 0;
                if(this.sSpecies == "shovel" && this.sFood.toLowerCase() == "small"){
                  aReturn.push("small shovel");
                  this.nTotal += 10;
                }else if(this.sSpecies == "shovel" && this.sFood.toLowerCase == "large"){
                  aReturn.push("large shovel");
                  this.nTotal += 15
                }else if(this.sSpecies == "bin" && this.sFood.toLowerCase() == "small"){
                  aReturn.push("small bin");
                  this.nTotal += 20;
                }else if(this.sSpecies == "bin" && this.sFood.toLowerCase == "large"){
                  aReturn.push("large bin");
                  this.nTotal += 25;
                }
                if(this.sLitter){
                  aReturn.push(this.sLitter);
                  this.nTotal += 30;
                }
                if(this.sExtras){
                  aReturn.push(this.sExtras);
                  this.nTotal += 35;
                }
                aReturn.push(`Your total comes to ${this.nTotal}`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return `
      <html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">ol{margin:0;padding:0}table td,table th{padding:0}.c3{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:60.8pt;border-top-color:#000000;border-bottom-style:solid}.c4{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:156pt;border-top-color:#000000;border-bottom-style:solid}.c5{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c1{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c10{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:24pt;font-family:"Arial";font-style:normal}.c8{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c9{border-spacing:0;border-collapse:collapse;margin-right:auto}.c0{padding-top:0pt;padding-bottom:0pt;line-height:1.0;text-align:left}.c6{background-color:#ffffff;max-width:468pt;padding:72pt 72pt 72pt 72pt}.c2{height:0pt}.c7{height:11pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c6"><p class="c8"><span class="c1">For curbside hardware:</span></p><p class="c8"><span class="c1">Your prayers have been answered </span></p><p class="c8"><span class="c10">Text &ldquo;tools&rdquo; or &ldquo;moj&rdquo; to 519-111-1111</span></p><p class="c8"><span class="c1">Moj tools on the go :D</span></p><p class="c8"><span class="c1">Yeah!! It&rsquo;s real.</span></p><p class="c8"><span class="c1">You can get your tools on your driveway.</span></p><p class="c8"><span class="c1">Here is the pricing</span></p><p class="c5"><span class="c1"></span></p><p class="c5"><span class="c1"></span></p><a id="t.74b4f06d5a98f4c271fc4afa6f57e83550cf3dca"></a><a id="t.0"></a><table class="c9"><tbody><tr class="c2"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c1">Item</span></p></td><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c1">Size</span></p></td><td class="c3" colspan="1" rowspan="1"><p class="c0"><span class="c1">price</span></p></td></tr><tr class="c2"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c1">Snow shovel</span></p></td><td class="c4" colspan="1" rowspan="1"><p class="c0 c7"><span class="c1"></span></p></td><td class="c3" colspan="1" rowspan="1"><p class="c0 c7"><span class="c1"></span></p></td></tr><tr class="c2"><td class="c4" colspan="1" rowspan="1"><p class="c0 c7"><span class="c1"></span></p></td><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c1">Small</span></p></td><td class="c3" colspan="1" rowspan="1"><p class="c0"><span class="c1">10</span></p></td></tr><tr class="c2"><td class="c4" colspan="1" rowspan="1"><p class="c0 c7"><span class="c1"></span></p></td><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c1">Large</span></p></td><td class="c3" colspan="1" rowspan="1"><p class="c0"><span class="c1">15</span></p></td></tr><tr class="c2"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c1">Garbage bin</span></p></td><td class="c4" colspan="1" rowspan="1"><p class="c0 c7"><span class="c1"></span></p></td><td class="c3" colspan="1" rowspan="1"><p class="c0 c7"><span class="c1"></span></p></td></tr><tr class="c2"><td class="c4" colspan="1" rowspan="1"><p class="c0 c7"><span class="c1"></span></p></td><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c1">Small</span></p></td><td class="c3" colspan="1" rowspan="1"><p class="c0"><span class="c1">20</span></p></td></tr><tr class="c2"><td class="c4" colspan="1" rowspan="1"><p class="c0 c7"><span class="c1"></span></p></td><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c1">Large</span></p></td><td class="c3" colspan="1" rowspan="1"><p class="c0"><span class="c1">25</span></p></td></tr><tr class="c2"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c1">Furnace filter</span></p></td><td class="c4" colspan="1" rowspan="1"><p class="c0 c7"><span class="c1"></span></p></td><td class="c3" colspan="1" rowspan="1"><p class="c0"><span class="c1">30</span></p></td></tr><tr class="c2"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c1">Car cloth (pack of 15)</span></p></td><td class="c4" colspan="1" rowspan="1"><p class="c0 c7"><span class="c1"></span></p></td><td class="c3" colspan="1" rowspan="1"><p class="c0"><span class="c1">35</span></p></td></tr></tbody></table><p class="c5"><span class="c1"></span></p><p class="c5"><span class="c1"></span></p><p class="c5"><span class="c1"></span></p><p class="c5"><span class="c1"></span></p><p class="c5"><span class="c1"></span></p></body></html>      `;
  
    }
}

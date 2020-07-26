class PriceExtractor {
    constructor(corpus){
        this.corpus=this.preProcessCorpus(corpus);
        //this array contains prefixes that identify that value is not a price
        this.priceNegatePrefixes=["off by"];
        //this array contains suffixes that identify that value is not a price
        this.priceNegateSuffixes=["%","percent","perc","discount","off"];
        //this contains currency prefixes
        this.currencyPrefixes=["$","£"];
        //this contains currency suffixes
        this.currencySuffixes=["usd","gbp","pound","pounds","dollar","dollars"];
        //this contains prefix texts that hint the value is a price
        this.pricePrefixTexts=["just","for","only","price of"];
        //this contains suffix texts that hint the value is price
        this.priceSuffixTexts=["only"];
    }

    getPrefixOrSuffix(value,index,corpus,prefixes=[],suffixes=[]){
        //if value is not at the beginning, otherwise no need to look for a prefix
        if (index>0 && prefixes.length>0){
            for (let x=0;x<prefixes.length;x++){
                //if prefix value fits within the starting bound of corpus
                if ((index-prefixes[x].length)>=0){
                    let startIndex=index-prefixes[x].length;
                    let endIndex=startIndex+prefixes[x].length;
                    if (corpus.substring(startIndex,endIndex)==prefixes[x]){
                        return prefixes[x];
                    }
                }
            }
        }
        //last index in corpus
        const maxBound=corpus.length-1;
        //if value do not stretches to the last character of corpus,otherwise no need to look for a suffix
        if ((index+value.length)<maxBound && suffixes.length>0){
            for (let x=0;x<suffixes.length;x++){
                //if prefix value fits within the starting bound of corpus
                if ((index+value.length+suffixes[x].length-1)<=maxBound){
                    let startIndex=index+value.length;
                    let endIndex=startIndex+suffixes[x].length;
                    if (corpus.substring(startIndex,endIndex)==suffixes[x]){
                        return suffixes[x];
                    }
                }
            }
        }
        return null;
    }

    getIfPrice(value,index,corpus){
        //if there is a prefix or suffix that negates the assertion of value being a price
        let preSuff=this.getPrefixOrSuffix(value,index,corpus,this.priceNegatePrefixes,this.priceNegateSuffixes);
        if (preSuff!=null){
            return null;
        }
        //get currency prefix or suffix
        preSuff=this.getPrefixOrSuffix(value,index,corpus,this.currencyPrefixes,this.currencySuffixes);
        if (preSuff!=null){
            return {value: value,currency: preSuff};
        }
        //if currency prefix or suffix not found then test if some prefix or suffix can hint if it is a price
        preSuff=this.getPrefixOrSuffix(value,index,corpus,this.pricePrefixTexts,this.priceSuffixTexts);
        if (preSuff!=null){
            return {value: value,currency: ''};
        }
        //add more heuristics in future
        //return value as price without any currency
        return null;
    }

    preProcessCorpus(corpus){
        corpus=corpus.trim();
        corpus=corpus.replace(/ /g,"");
        corpus=corpus.toLowerCase();
        return corpus;
    }

    extract(){
        //look for numbers including optional decimals
        const regExp=new RegExp(/\d+(\.\d+)?/);
        const prices=[];
        let corpus=this.corpus;
        while(true){
            let match=regExp.exec(corpus);
            console.log(match);
            if (match==null){
                break;
            }
            let price=this.getIfPrice(match[0],match.index,corpus);
            if (price!=null){
                prices.push(price);
            }
            corpus=corpus.substring((match.index+match[0].length));
        }
        return prices;
    }
}
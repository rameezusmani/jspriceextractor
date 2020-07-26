# jspriceextractor
Javascript based class that extracts price(s) from a given text. It extracts numbers from text using regular expression and after that apply small set of heuristics to identify if extracted number can be considered a "price" or not. Right now following currencies are supported

    //this contains currency prefixes
    this.currencyPrefixes=["$","£"];
    //this contains currency suffixes
    this.currencySuffixes=["usd","gbp","pound","pounds","dollar","dollars"];
    
If you want to add/remove currencies you can simple modify the above arrays in the constructor of PriceExtractor class.

### Usage

    <script src="priceextractor.js"></script>
    <script>
        const prices=new PriceExtractor("Enjoy 10% off for 23 only").extract();
        //prices will contain
        //[{value:23,currency:''}]
        console.log(prices);
    </script>

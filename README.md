# jspriceextractor
Javascript based class that extracts price(s) from a given text. It extracts numbers from text using regular expression and after that apply small set of heuristics to identify if extracted number can be considered a "price" or not

#### usage
  
  <script src="priceextractor.js"></script>
  <script>
    const prices=new PriceExtractor("Enjoy 10% off for 23 only").extract();
    //prices will contain
    //[{value:23,currency:''}]
    console.log(prices);
  </script>

# jspriceextractor
Javascript based class that extracts price(s) from a given text

#### usage
  <script src="priceextractor.js"></script> 
  <script>
    const prices=new PriceExtractor(document.getElementById('corpus').innerHTML).extract();
    console.log(prices);
  </script>

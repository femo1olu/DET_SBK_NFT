
const NFT_Collection = require('../data/collection.json')

console.log('This is the content of the collection ', NFT_Collection)

fetch("/home/femi-fawe/Desktop/EY/OffDChain/data/collection.json")
.then(function(response){ console.log(response.json())
   return response.json();
})
.then(function(products){
   let placeholder = document.querySelector("#data-output");
   let out = "";
   for(let product of products){
      out += `
         <tr>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td> <img src='${product.image}'> </td>
            <td>${product.attributes}</td>
         </tr>
      `;
   }
 
   placeholder.innerHTML = out;
});

 //make accessible to other files
 module.exports = router; 
///<reference types="../@types/jquery"/>
    customers= [
    {
    "id": 1,
    "name": "Ahmed Ali"
    },
    {
    "id": 2,
    "name": "Aya Elsayed"
    },
    {
    "id": 3,
    "name": "Mina Adel"
    },
    {
    "id": 4,
    "name": "Sarah Reda"
    },
    {
    "id": 5,
    "name": "Mohamed Sayed"
    }
    ],
    transactions= [
    {
    "id": 1,
    "customer_id": 1,
    "date": "2022-01-01",
    "amount": 1000
    },
    {
    "id": 2,
    "customer_id": 1,
    "date": "2022-01-02",
    "amount": 2000
    },
    {
    "id": 3,
    "customer_id": 2,
    "date": "2022-01-01",
    "amount": 550
    },
    {
    "id": 4,
    "customer_id": 3,
    "date": "2022-01-01",
    "amount": 500
    },
    {
    "id": 5,
    
    "customer_id": 2,
    "date": "2022-01-02",
    "amount": 1300
    },
    {
    "id": 6,
    "customer_id": 4,
    "date": "2022-01-01",
    "amount": 750
    },
    {
    "id": 7,
    "customer_id": 3,
    "date": "2022-01-02",
    "amount": 1250
    },
    {
    "id": 8,
    "customer_id": 5,
    "date": "2022-01-01",
    "amount": 2500
    },
    {
    "id": 9,
    "customer_id": 5,
    "date": "2022-01-02",
    "amount": 875
    }
    ]

var deatailsIsOpen=false

$('#closeBtn').on('click',function(){
    if (deatailsIsOpen) {
          $('.detailsTable').animate({left:"-102%"},300,function(){
        $('.pointer').animate({display:"none"})
    }) 
    deatailsIsOpen=false
    }
  
})
// $(document).on('click',function(){
//     if(deatailsIsOpen){
//     $('.detailsTable').animate({left:"-102%"},300,function(){
//         $('.pointer').animate({display:"none"})
        
//     })
//     deatailsIsOpen=false

// } 
// })
// $('.detailsTable').on('click',function(){
//     if(deatailsIsOpen){
//           e.stopPropagation()
//     }
  
// })

var totalTransArr=[]

function getTotalTransaction() {
var totalTrans=0
  for (let i = 0; i < customers.length; i++) {

    for (let j = 0; j < transactions.length; j++) {

        if(customers[i].id==transactions[j].customer_id){
            totalTrans+=transactions[j].amount
        }else{
            // console.log("not equal");
        }
       
    }
        
        totalTransArr.push(totalTrans)
        totalTrans=0
       
  }
//   for (let j = 1; j < transactions.length; j++) {
//     if(transactions[j].date!=transactions[j-1].date){
//         dates.forEach(element => {
//             if(element!=transactions[j]){
//                 date=transactions[j].date;
//             }
             
//         });dates.push(date)
//     } 
   
// }

    console.log(totalTransArr);

}
getTotalTransaction()
displayCustomers(customers)
// $('.showDetails').on('click',function(){
//     displayTransactionData(customerId)
// })
function displayCustomers(customers){

 var box=``
 for (let i = 0; i < customers.length; i++) {

    box+=`
     <div onclick=" showChart(${customers[i].id})" class="row table-content text-center py-2 mx-0">
       
     <div   class="col-md-6 ">
                                <div class="">
                                    <p>${customers[i].name}</p>
                                </div>
                            </div>
                            <div class="col-md-6 d-flex justify-content-center align-items-center">
                                <div class=" col-md-6">
                                    <p>${totalTransArr[i]}</p>
                                </div>
                                <i onclick="displayTransactionData(${customers[i].id})" class="showDetails  fa-solid fa-chevron-right col-md-6 ms-5 "></i>
                            </div>
                            </div>
                   
    `
}

$('#Data').html(box)

}
function displayTransactionData(customerId) {
    deatailsIsOpen=true
        $('.detailsTable').animate({left:"0"},300,function(){
            
        $('.pointer').animate({display:"block"})
        
    }) 
   
    var box=`
    
    `
 for (let i = 0; i < transactions.length; i++) {
   if(transactions[i].customer_id==customerId){
      customers.forEach(customer => {
        if(customer.id==customerId)
          name=customer.name
      });
      $('#custName').html(`<h6 class="text-center mt-5">${name}</h6>`)
     box+=`

           <div class="col-md-6">
                <p>${transactions[i].date}</p>
            </div>
            <div class="col-md-6">
                <p>${transactions[i].amount}</p>
            </div>

    `
   }
   
 }
$('#transitionsdata').html(box)
}

function searchProduct(searchKey) {
    let searchResult = []
    let notFound= ``
    for (i = 0; i < customers.length; i++) {
        if (customers[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
            console.log(customers[i])
            searchResult.push(customers[i])
        }
        else{
           notFound=`
             <p class="text-danger text-center">Oops..! Not found</p>   `
        }       
    }
    if(searchResult.length==0){
    $('#Data').html(notFound)
    }else{
        displayCustomers(searchResult)
    }    
    console.log("SEARCH RESULT IS" + searchResult)
} 
function filterByAmount(value) {
    
    let box=` `
    let filterResult = []
    
      transactions.forEach(trans => {
    if (Number(trans.amount)<value||trans.amount==value) {
        customers.forEach(customer => {
    if(customer.id==trans.customer_id){
        box+=`
        <div onclick="displayTransactionData(${customer.id}),test()" class="row table-content text-center py-2 mx-0">
          
        <div   class="col-md-4 ">
                                   <div class="">
                                       <p>${customer.name}</p>
                                   </div>
                               </div>
                               <div class="col-md-4">
                                   <div class="">
                                       <p>${trans.amount}</p>
                                   </div>
                               </div>
                               <div class="col-md-4">
                                   <div class="">
                                       <p>${trans.date}</p>
                                   </div>
                               </div>
                               </div>
                      
       `
    }
});
    }
});
$('#Data').html(box)
}
let dates=[]
let amounts=[]
let customersName=[]
customers.forEach(customer => {
    name=customer.name
    customersName.push(customer.name)
});
function getCustomerTransPerDay(custId){
     dates=[ ]
     amounts=[ ]

        
        for (let j = 0; j < transactions.length; j++) {
                if(custId==transactions[j].customer_id){
                    date=transactions[j].date
                    dates.push(date)
                   
                    amount=transactions[j].amount
                    amounts.push(amount)
                   
                   
                }else{
                    // console.log("not equal");
                }      
    }
    console.log(amounts); console.log(dates);
    return dates,amounts;
}
var myChart
console.log(totalTransArr);
$(document).ready();
defaultChart()
function defaultChart() {
    if (myChart) {
        myChart.destroy();
    }
    const ctx = $('#myChart')[0].getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line', // Change this to 'bar', 'pie', etc. for different types of charts
        data: {
            // labels: ['January', 'February', 'March', 'April', 'May'],
            labels:customersName,
            datasets: [{
                label: " ",
                data: totalTransArr,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'white',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutBounce'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function showChart(custId) {
  
    if (myChart) {
        myChart.destroy();
    }
    const ctx = $('#myChart')[0].getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line', // Change this to 'bar', 'pie', etc. for different types of charts
        data: {
            // labels: ['January', 'February', 'March', 'April', 'May'],
            labels:dates,
            datasets: [{
                label: " ",
                data: getCustomerTransPerDay(custId),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'white',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutBounce'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
   
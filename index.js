// 1 . TO ENTER A NEW ORDER
// 2 . TO GET ORDER DETAAIL
// 3 . TO GET THE TOTAL SALES
// 5 . TO EDIT AN ORDER
const readline = require("readline-sync"); 

const fs = require("fs"); 





var IS_RUNNING = true;

function exit(){
    IS_RUNNING = false;
    console.log("Thank you for using our system. Goodbye!");
}

function calculateTotalSales(){
    const data = require("./data.json");
    let orders = data.orders;
    let total = 0;
    for (let i = 0; i < orders.length; i++){
        total = total + orders[i].total;
    }
    console.log("Total Sales: " + total);
}


function takeOrder(){
    const data = require("./data.json");
    let items = data.items;
    console.log("Please select an item from the list below: ");
    for (let i = 0; i < items.length; i++){
        console.log(i + 1 + ". " + items[i].name + " - " + items[i].price);
    }
    let order_item = readline.question("Enter the number of the item you want to order: ");
  
    let name = readline.question("Enter Customer Name: ");
    order_item = order_item.split(",");
    let order_items = [];

    let total = 0;
    for (let i = 0; i < order_item.length; i++){
        order_items.push({
            name: items[order_item[i] - 1].name,
            price: items[order_item[i] - 1].price
        
        });
        total = total + items[order_item[i] - 1].price;
    }


    let order = {
        name: name,
        items: order_items,
        total: total
    }
    data.orders.push(order);
    fs.writeFileSync("data.json", JSON.stringify(data));
    console.log("Order placed successfully!");

}

function takeInput(){
    let a = readline.question("'Please select an option: \n 1. TO ENTER A NEW ORDER \n 2. TO GET ORDER DETAAIL \n 3. TO GET THE TOTAL SALES \n 5. TO EDIT AN ORDER \n 6. TO EXIT \n");

    if(a == 6){
        exit();
    }
    if (a == 1){
        takeOrder();
    }
    if (a == 3){
        calculateTotalSales();
    }
}

while(IS_RUNNING){
    takeInput();
}
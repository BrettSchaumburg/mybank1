function AllData() {

    const currentUserCtx = React.useContext(currentUserContext);

    const [isValid, setisValid] = React.useState(false);

    const [amount, setAmount] = React.useState("");
    const ctx = React.useContext(UserContext);

    //var data = '["Red","Green","Blue"]';
 
 
    function getData(){
        var data = JSON.stringify(ctx.users[currentUserCtx.index]);

// (B2) CREATE LIST
    var list = document.createElement("ol");
    for (let i of data) {
        let item = document.createElement("li");
        item.innerHTML = i;
        list.appendChild(item);
    }
    
    document.getElementById("demoA").appendChild(list);
    }
    
    
    return (
        <Card 
            
            header="All Data"
          
            bgcolor="info"
            txtcolor="white"
            

            body={currentUserCtx.loginStatus ? (
            <>
                <br/>
                    <div >
                        <h5>Account History for: {ctx.users[currentUserCtx.index].name}  </h5>
                        <h6>________________________________________________________________</h6>

                        <h6>{ctx.users[currentUserCtx.index].history}</h6>
                    </div>
                    
                    <br/>
            </>
        ):(
            <div>
                <h2>LOGIN TO USE FEATURE!</h2>
                <h2>THANKS</h2>
            </div>
        )
        }
        />
    );


}
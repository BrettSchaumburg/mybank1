function Balance() {
    //const currentUser = React.useContext(UserContext);

    const [deposit, setDeposit] = React.useState();
    const [amount, setAmount] = React.useState("");
    const [user, setUser] = React.useState("");
    const ctx = React.useContext(UserContext);
    const [balance, setBalance] = React.useState("");
    
     
    console.log(JSON.stringify(ctx));
    console.log(ctx.loginStatus);
        //console.log('the current balane user:  '+currentUser.user.email);
        // console.log('the current user status:  '+currentUser.user.loginStatus);
        // console.log('the current user status:  '+currentUser.loginStatus);

    const now = new Date();


    function getTime(){
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return (hours+":"+minutes);
    }

      function getDate() {
            return Date();
        }
    
    function getBalance() {

        fetch(`/account/findOne/${ctx.email}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
            //    setStatus(JSON.stringify(data.value));
            //    setShow(false);
            //    props.setStatus("You have successfully deposited: $"+amount);
                console.log('JSON:', data.balance);
                ctx.balance = data.balance;
                setBalance(data.balance);

            } catch(err) {
                //setStatus('Deposit failed')
                console.log('err:', text);
            }
        });    
        
        // fetch(`/account/changeactivity/${ctx.email}/${getTime()}/${getDate()}/checkbalance/NA/${balance}`)  
        // .then(response => response.text())
        // .then(text => {
        //     try {
        //         const data = JSON.parse(text);
        //         //setStatus(JSON.stringify(data.value));
        //         setShow(false);
        //         // props.setStatus("You have successfully deposited: $"+amount);
        //         console.log('JSON:', data);
        //     } catch(err) {
        //         // props.setStatus('Deposit failed')
        //         console.log('err:', text);
        //     }
        // });  
        console.log(`this is the balance: ${amount}`);
        return balance;  
        // console.log(`this is the balance: ${amount}`);
        // return currentUser.balance;
        
    }
    // function getUser() {
    //     //return ctx.users[currentUserCtx.index].name;
    //    (currentUser.email);
        
    // }

    
    

    return (
        <Card
            header={<>
                <div style={{float: 'left'}}>
                <h5>Balance</h5><p></p>
                </div>
                <div style={{float: 'right'}}>
                 User: <i>{ctx.name}</i>
                 </div>
                
                </>}
            cardWidth='45%'
            bgcolor="info"
            txtcolor="white"
            bodyContainerWidth='500px'
    
            body={ctx.loginStatus ? (  //if status is true
            <>
                <br/>
                    <div >
                        <h3>Welcome: {ctx.email}</h3>
                        <br/>
                        <h5>Balance: ${getBalance()}</h5>
                        
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

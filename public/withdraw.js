function Withdraw(){

const currentUserCtx = React.useContext(currentUserContext);

const [isValid, setisValid] = React.useState(false);
const [isWithdrawSuccess, setisWithdrawSuccess] = React.useState(false);


const [balance, setBalance] = React.useState(0);

const [amount, setAmount] = React.useState(0);
const ctx = React.useContext(UserContext);

const now = new Date();
   

    function getTime(){
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return (hours+":"+minutes);
    }

    function getBalance() {
        

        //setAmount(ctx.users[currentUserCtx.index].balance);
        fetch(`/account/findOne/${ctx.email}`)
       .then(response => response.text())
       .then(text => {
           try {
               const data = JSON.parse(text);
            //    setStatus(JSON.stringify(data.value));
            //    setShow(false);
            //    props.setStatus("You have successfully Withdrawed: $"+amount);
               console.log('JSON:', data.balance);
               ctx.balance = data.balance;
               setBalance(data.balance);

           } catch(err) {
               props.setStatus('Withdraw failed')
               console.log('err:', text);
           }
       });    
        console.log(`this is the balance: ${amount}`);
        return ctx.balance;
        
    }

    function getDate() {
        return Date();
    }

    function checkInputParams(inputParm){
       if(ctx.balance - inputParm < 0){
         alert("you do not have enough funds to cover the withdrawal!")     
         return false;   
       } 
       if (checkIfLessThanZero(inputParm) && checkIsNumber(inputParm)){
            console.log("input parms true")                
            return true;
        }
        else{
            console.log("input parms false")                
            return false;

        }
            
    }


    function checkIfLessThanZero(myInput){
            if (myInput < 0){
                alert("please enter a number > 0");
                return false;
            }
            else{
                return true;
            }
    }
    
    function checkIsNumber(value) {
        console.log("This is value:"+value);
        
        if (isNaN(value)){
            
            alert("please enter a number!");
            return false;
        }
        else
        {
            return true;
        }
        
      }

    const handleWithdraw = (e) => {

        console.log(`this is new balance: ${amount}`);
        //alert(`Withdraw of $${amount} completed!`);
       // ctx.users[currentUserCtx.index].balance = ctx.users[currentUserCtx.index].balance + amount;
       // ctx.users[currentUserCtx.index].history.push(getDate(),"-  Withdraw of $",amount,<br/>);
        
       fetch(`/account/update/${ctx.email}/-${amount}`)
       .then(response => response.text())
       .then(text => {
           try {
               const data = JSON.parse(text);
               setStatus(JSON.stringify(data.value));
               setShow(false);
               props.setStatus("You have successfully withdrawn: $"+amount);
               console.log('JSON:', data);
           } catch(err) {
               props.setStatus('Withdraw failed')
               console.log('err:', text);
           }
       });   
       
       fetch(`/account/changeactivity/${ctx.email}/${getTime()}/${getDate()}/withdraw/${amount}/${balance}`)  
       .then(response => response.text())
       .then(text => {
           try {
               const data = JSON.parse(text);
               //setStatus(JSON.stringify(data.value));
               setShow(false);
              // props.setStatus("You have successfully deposited: $"+amount);
               console.log('JSON:', data);
           } catch(err) {
              // props.setStatus('Deposit failed')
               console.log('err:', text);
           }
       });  
        
        setAmount(0);
        setisWithdrawSuccess(true);
    };

    const handleOk = (e) => {
        
        setisWithdrawSuccess(false);
    };


    const handleChange = (e) => {
        
        console.log(`This is setAmount: ${amount}`);
        
            if (!(checkInputParams(e.target.value))) {
                
                (e.target.value) = 0;
                
                setisValid(false);
                
            }
            else{
                setisValid(true);
            }
    
            setAmount(Number(e.target.value));
        
     
            
      };
    

    return (
        <Card 
            header={<>
                <div style={{float: 'left'}}>
                <h5>Withdraw</h5><p></p>
                </div>
                <div style={{float: 'right'}}>
                 User: <i>{ctx.name}</i>
                 </div>
                
                </>}
            cardWidth='45%'
            bgcolor="info"
            txtcolor="white"
            bodyContainerWidth='500px'
    
            body={ctx.loginStatus ? (
                isWithdrawSuccess ? (
                <>
                    <h2>Withdraw Success!</h2>
                    <button onClick={handleOk} className="btn btn-light" type="submit">
                        Continue...
                    </button>
                <h2></h2>
                </>):(
                <>  
                <br/>
                    
                    <div >
                        <h3>Welcome: {ctx.email}</h3><br></br>
                        <h5>Balance: ${getBalance()}</h5>
                    </div>
                    <br/>
                    <div>
                        <input
                        onChange={handleChange}
                        value={amount}  
                        type="text"
                        id="amount"
                        className="form-control"
                        placeholder="Withdraw Amount..."
                        />
                    </div>
                    <br/>
                    <div>
                        <button disabled={!isValid} onClick={handleWithdraw} className="btn btn-light" type="submit">
                        Withdraw
                        </button>    
                    </div>
                  </>)
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
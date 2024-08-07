function AllData(){
   // const [data, setData] = React.useState('');  
    const ctx = React.useContext(UserContext);
    const [isButtonDisabled, setButtonDisabled] = React.useState(false);
    //React.useEffect(() => {

    React.useEffect(()=>{
           
            setButtonDisabled(true);
    //        const url = `/account/find/${ctx.email}`
            fetch(`/account/find/${ctx.email}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    
                    var newData = JSON.stringify(data);
                    console.log('*******************');
                    console.log('this is data activity:'+data[0].activity.length);
                    console.log('*******************');
                    var list = document.createElement("ol");
    
                                    
                    let tbody = document.getElementById('tbody');
    
                    for (let rows of data[0].activity) {
                        let tr = document.createElement('TR');
                        let td, tdText;
                        for (let value of Object.values(rows)) {
                            td = document.createElement("TD");
                            td.appendChild(document.createTextNode(value));
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                    };
                    
            
            
                });
            },[])
                

    function getData(){
        // fetch all accounts from API
        
       

        
    }


    return (<Card 

        header={<>
            <div style={{float: 'left'}}>
            <h5>All Data</h5><p></p>
            </div>
            <div style={{float: 'right'}}>
             User: <i>{ctx.name}</i>
             </div>
            
            </>}
             cardWidth='100%'
        bgcolor="info"
        txtcolor="white"
        bodyContainerWidth='800px'
        body={ctx.loginStatus ? (
        <div>
       
        
        
        <h3>User Activity: {ctx.email}</h3>
        <h5>Account Number: {ctx.account}</h5>
        <table border="1">
            <thead>
                <tr>
                    <td>Time</td>
                    <td>Date</td>
                    <td>Activity</td>
                    <td>Amount</td>
                    <td>Previous Balance</td>
                    
                </tr>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>      
        </div>    
         
        ):(
            <div>
            <h2>LOGIN TO USE FEATURE!</h2>
            <h2>THANKS</h2>
        </div>
        )}
    />);
}
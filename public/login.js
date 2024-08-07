function Login() {
    const [show, setShow] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [msg, setMsg]   = React.useState('No Current User');
   const [isLogged, setIsLogged] = React.useState(false);

    //const UserContext = React.createContext();
//    const currentUser          = React.useContext(currentUserContext); //same as ctx

    const currentUser          = React.useContext(UserContext); //same as ctx

    const ctx          = React.useContext(UserContext); //same as ctx
    
    console.log(JSON.stringify(ctx));

    //alert("this is the show state:"+show);

     
   //Get Current Authentication Status  //if signin or signout
    auth.onAuthStateChanged((userCredential) => {
        if (userCredential) {
        //    console.log('1');
         //   setShow(false);
          if (ctx.loginStatus){
            setShow(false);
          }
        //setMsg(auth.user.email);
           setIsLogged(true); 
        //   console.log("Login Page Current User: ");
        //     console.log(userCredential);
        //     currentUser.user = userCredential;
        //     console.log(`Current Email: ${currentUser.user.email}`);
        //     console.log(`Current UID: ${currentUser.user.uid}`);
        //     console.log("End Initializing");
        //  //   setMsg(currentUser.loginStatus);
        //     ctx.name = currentUser.user.email;
            
        } else {
            // If the user is logged out...
               
            setShow(true);
            console.log("No User Logged In");
            //currentUser.user = {};
        }
    });
    //const UserContext = React.createContext({users:[]});
  

    //  const ctx = React.useContext(UserContext);
    //     const ctx = React.useContext(UserContext);   
    console.log("This is the currentUser email: " + JSON.stringify(currentUser.user));
    //console.log("This is the currentUser name: " + (currentUser.user.name));
    
    //check auth.for current user
    //console.log(JSON.stringify(ctx.users));
    // if (JSON.stringify(currentUser) === '{}'){
    //     alert('current User is an NULL object!!!!!!!');
    //     //setUser("")

    // }

    
    
    function getUser() {
        const users = ctx.users;
        for (const [index, user] of Object.entries(users)) {
            if (email === user.email & password === user.password) {
                clearForm();
                return [index, user];
            }
        }
        alert('Password or UserID not correct');   
        clearForm();
        return {};
    }

    function updateCurrentUser(name, email, password, loginStatus,) {


        
        ctx.name = name;
        console.log("This is the ctx name:"+ctx.name);
        ctx.email = email;
        ctx.password = password;
        ctx.loginStatus = loginStatus; 

    }
    
    function login() {
        console.log('Login email is ' + email + ' password is ' + password);
        // const user = getUser();
        // if (user.length > 0) {
        //     if (Object.keys(user[1]).length > 0) {
        //         updateCurrentUser(user[1].name, user[1].email, user[1].password, user[1].balance, user[0], true);
        //         setShow(false);
        //     } else {
        //         updateCurrentUser('', '', '', 0, 0, false);
        //     }
        //     console.log('user ' + JSON.stringify(currentUserCtx));  
        // }else {
        //     alert('No Valid User');
        // }
          // Login with firebase , returns a promise
        auth.signInWithEmailAndPassword(email,password)
        .then((userAuth) =>
        {
           // console.log('Signed in successfully');
            console.log('AUTH User Credentails: ' + JSON.stringify(userAuth));
            

            // assign the currect user
           updateCurrentUser(userAuth.user.name,
                              userAuth.user.email,
                              userAuth.user.password,
                              true);
            //currentUser.user = userAuth;
            
            //setMsg(currentUser.loginStatus);
            //ctx.email = currentUser.user.email;
            //console.log('this is the ctx.email'+ ctx.email);
            setMsg(ctx.email);
            //console.log('this is the msg'+ msg);
           
            fetch(`/account/findOne/${ctx.email}`)
            .then(response => response.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                 //    setStatus(JSON.stringify(data.value));
                 //    setShow(false);
                 //    props.setStatus("You have successfully deposited: $"+amount);
                    //console.log('json get name:', data.name);
                    ctx.name = data.name;
                    ctx.account = data.accountNumber;
                    setMsg();
                    //setBalance(data.balance);
 
                } catch(err) {
                    props.setStatus('get user failed')
                    console.log('err:', text);
                }
            });    
            //set the context variable to show other areas to access now that logged in
            //currentUser.loginStatus = true;

            // // display a toast message
            // CustomToastMessage('success', 'top', 'validation', '10000').fire({
            // animation: false,
            // title: 'Signed in successfully!'
            // });

            //props.setStatus("Signed in successfully!");
            //alert("Signed in successfully!");
            setTimeout(() => setShow(false), 1000);
            //setEmail('');
            //setPassword(''); 
            
            

        })
        .catch((error) =>
        {
            // clear the input for re-authentication
            setEmail('');
            setPassword('');
            // Setting the status message
            //props.setStatus(`Error Message: ${error.message}`);
            alert("Error signing in!  Please try again...")
            setTimeout(() => setShow(true), 4000);  

            // CustomToastMessage('error', 'top', 'validation', '10000').fire({
            // animation: false,
            // title: `Error Message: ${error.message}`
            // });
        });
    }

    function logout() {

        firebase.auth().signOut()
        .then(() =>{
        //   CustomToastMessage('success', 'top', 'validation', '10000').fire({
        //     animation: false,
        //     title: 'You have signed out successfully'
        //   });
         // alert('successfully logged out!');
          //.setShow(true);
          setTimeout(() => setShow(true), 4000);  
        
        })
        .catch((error) =>{
          //props.setStatus(false);
          setTimeout(() => setShow(true), 4000);  
        });

        //currentUser.user = {};
        clearForm();
      
        updateCurrentUser("", "NO USER LOGGED IN", "", false);
      ctx.name = "No user logged in!";
              //ctx.loginStatus = false;
        setIsLogged(false);
    }

    function clearForm() {
        setEmail('');
        setPassword('');
        setMsg('');
        setShow(true);
    }

    return (
        <Card
        cardWidth='45%'
        bgcolor="info"
        txtcolor="white"
        fontSizeHeader="3.95"
        headerBgColor="#F65058FF"
        header={<>
                <div style={{float: 'left'}}>
                <h5>Login</h5><p></p>
                </div>
                <div style={{float: 'right'}}>
                 User: <i>{ctx.name}</i>
                 </div>
                
                </>}
        headerDisplay='flex'
        headerJustifyContent='center'
        bodyAlign="center"
        bodyContentAlign='center'
        body={show ? ( // IF SHOW IS TRUE 
            <>
                <br/>
                <input style={{maxWidth: '275px', margin: 'left'}} type="input" className="form-control" id="email"
                placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                <br/>
                <input style={{maxWidth: '275px', margin: 'left'}} type="password" className="form-control" id="password"
                placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
                <br/>
                <button style={{justifyContent: 'center'}}type="submit" className="btn btn-light mr-2" onClick={login}>Login</button>
                
            </>
        ):(  //IF SHOW IS FALSE
            <>
                <h5 style={{margin:'left'}}>Success, {ctx.name} has logged in! </h5>
                <button disabled={!isLogged} style={{justifyContent: 'center'}}type="submit" className="btn btn-light mr-2" onClick={logout}>Logout</button>
            </>
        )}   
        />        
    )
}


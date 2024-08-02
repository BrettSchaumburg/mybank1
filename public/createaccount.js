function CreateAccount() {
    const currentUser = React.useContext(UserContext);   

    const [show, setShow] =         React.useState(true);
    const [status, setStatus] =     React.useState('');
    const [name, setName] =         React.useState('');
    const [email, setEmail] =       React.useState('');
    const [password, setPassword] = React.useState('');

    function validate(field,label){
        if(!field) {
            setStatus('Error: ' + label)
            setTimeout(() => setStatus(''),3000);
            return false;
        }
        return true;
    }

    //function handle(){
 


    function handleCreate(){
        console.log(name,email,password);
        if(!validate(name,      'name')) return;
        if(!validate(email,     'email')) return;
        if(!validate(password,  'password')) return;

        const promise = auth.createUserWithEmailAndPassword(
            email,
            password
          );
          promise.then((resp) => {
            console.log('User Signup + Login Response: ', resp);
            console.log('sign up success');
            
            console.log(name,email,password);
            const url = `/account/create/${name}/${email}/${password}`;
            (async () => {
                var res  = await fetch(url);
                var data = await res.json();    
                console.log(data);        
                setShow(false);
            })();
            setShow(false);//logout.style.display = 'inline';
            //login.style.display = 'none';
            //signup.style.display = 'none';
            //write.style.display = 'inline';
            
            
            //updateCurrentUser(resp.user.email);
          });
          promise.catch((e) => {
              console.log(e.message);
              console.log('create new user catch!');
              if (e.message === "The email address is already in use by another account."){
                  alert(e.message);
                  clearForm();
              }
              if (e.code === "auth/weak-password"){
                alert(e.message);
                clearForm();
              }
              if (e.code === "auth/invalid-email"){
                alert(e.message);
                clearForm();
              }  
              
            });
        //ctx.users.push({name,email,password,balance:100,history:[]})
        
    }


    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }




    return (
        <Card
            cardWidth='45%'
            bgcolor="info"
            txtcolor="white"
            bodyContainerWidth='500px'
            
            header="Create Account"
            status={status}
            body={show ? (  //show if true
                <>
                Name<br/>
                <input type="input" className="form-control" id="name"
                placeholder="Enter Name" value={name} onChange={e=>setName(e.currentTarget.value)} /><br/>
                Email Address<br/>
                <input type="input" className="form-control" id="email"
                placeholder="Enter Email" value={email} onChange={e=>setEmail(e.currentTarget.value)} /><br/>
                Password<br/>
                <input type="input" className="form-control" id="password"
                placeholder="Enter Password" value={password} onChange={e=>setPassword(e.currentTarget.value)} /><br/>
                <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
                </>
            ):(    //show this if show is false
                <>
                <h5>Success!</h5>   
                <i> -Please create another account or go Login</i>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Create Another Account</button>              
                </>
            )}        
        
        />        
        
    );
}
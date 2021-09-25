import React ,{ useRef, useImperativeHandle,useState } from 'react';
import './user-form.less';

function UserForm(props,ref){
  const {user,roles} = props;
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [role_id, setRole] = useState(user.role_id);
  const userName = useRef();
  const passWord = useRef();
  const Email = useRef();
  const phoneNumber = useRef();
  const Role = useRef();
  useImperativeHandle(ref, () => ({
    getValues: () => {
      return {
        username,password,phone,email,role_id
      }
    },
    reset:(p)=>{
      setUsername(p.username)
      setPassword(p.password)
      setEmail(p.email)
      setPhone(p.phone)
      //setRole(p.role_id)
    },
    empty:()=>{
      setUsername('')
      setPassword('')
      setEmail('')
      setPhone('')
      //setRole('')
    }
  }));

  return (
    <div className='modify_modal'>
      <div>
        <label htmlFor='username'>用户名:</label>
        <input id='username' ref={userName} value={username} onChange={e=>setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor='password'>密码:</label>
        <input id='password' type='password' ref={passWord} value={password} onChange={e=>setPassword(e.target.value)}/>
      </div>
      <div>
        <label htmlFor='email'>邮箱:</label>
        <input id='email' ref={Email} value={email} onChange={e=>setEmail(e.target.value)}/>
      </div>
      <div>
        <label htmlFor='phone'>手机:</label>
        <input id='phone' ref={phoneNumber} value={phone} onChange={e=>setPhone(e.target.value)}/>
      </div>
      <div>
        <label htmlFor='role'>角色:</label>
        <select id='role' ref={Role} value={role_id} onChange={e=>setRole(e.target.value)}>
            {
                roles.map(ro => <option key={ro.id} value={ro.id}>{ro.name}</option>)
            }
        </select>
      </div>
    </div>
  )
}

export default React.memo(React.forwardRef(UserForm));

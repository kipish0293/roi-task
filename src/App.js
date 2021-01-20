import './App.css';
import './MyStyle/MyStyle.css';
import React, {useState} from 'react';
import Table from './Table/Table';
import Option from './Option/Option';

function App() {
  let newDate = [];

  localStorage.length < 1 ? newDate = [] : newDate = JSON.parse(localStorage.getItem('item'));

  const [storageData, setStorageData] = useState(newDate);
  const [inputName,setName] = useState('');
  const [inputPhone,setPhone] = useState('');
  const [inputBoss,setBoss] = useState({value: 'not selected'});
  const [displayBlock,setDisplay] = useState('d-none');

  const getName = (e) => {
    setName(e.target.value);
  }

  const getPhone = (e) => {
    let num = e.target.value;
    if(isNaN(num)) {
      console.log('first')
      alert('Введите телефон в формате числа')
    } else(
      setPhone(e.target.value)
    )
    
  }

  const getOptionBoss = (e) => {
    setBoss({value: e.target.value});
  }

  const getValueForm = (e) => {
    if(inputName != '' && inputPhone != '') {
      const oneItemForArray = {name:inputName, phone:inputPhone, boss:inputBoss.value};
      storageData.push(oneItemForArray);
      localStorage.setItem('item', JSON.stringify(storageData));
      setName('');
      setPhone('');
    } else {
      alert('Не все данные заполнены, введите все поля')
    }
    
  }

  const openForm = () => {
    if (displayBlock==='d-block') {
      setDisplay('d-none')
    } else if (displayBlock==='d-none') {
      setDisplay('d-block')
    }
  }

  const sortName = () => {
    const clonestorageData = [...storageData];
    clonestorageData.sort((prev, next) => {
      if ( prev.name < next.name ) return -1;
      if ( prev.name < next.name ) return 1;
    });
    setStorageData(clonestorageData)
  }

  const sortPhone = () => {
    const clonestorageData = [...storageData];
    clonestorageData.sort((prev, next) => prev.phone - next.phone);
    setStorageData(clonestorageData);
  }

  const sortBoss = () => {
    const clonestorageData = [...storageData];
    clonestorageData.sort((prev, next) => {
      if ( prev.name < next.name ) return -1;
      if ( prev.name < next.name ) return 1;
    });
    setStorageData(clonestorageData)
  }
  
  return (
    <div className="App">
      <div className="container">
        <div className="btn-offer">
          <button className="btn" onClick={()=>openForm()}>
            Добавить
          </button>
        </div>
        <div className="d-flex">
          <div id="personList">    
            <table className="table" border="1" col="3">
              <tr className="table-row">
                  <td id="table-name" className="table-name td" onClick={()=>sortName()}>Имя</td>
                  <td id="table-phone" className="table-phone td" onClick={()=>sortPhone()}>Телефон</td>
                  <td id="table-boss" className="table-boss td" onClick={()=>sortBoss()}>Начальник</td>
              </tr>
              {
                storageData ? storageData.map((item,index)=> {
                  return (
                    <Table
                      key={index}
                      name={item.name}
                      phone={item.phone}
                      boss={item.boss}
                    />
                  )
                }) : 'null'
              }
            </table>
          </div>
          <div className='modal-form'>
            <div id="form" className={`${displayBlock}`}>
              <form className="form" action="#" onSubmit={(e)=>{e.preventDefault()}}>
                <p className="add-user">Добавить пользователя</p>
                <div className="input-offer d-flex">
                  <span>Введите имя</span>
                  <input className="input-border" value={inputName} name="name" type="text" placeholder="Имя" required onChange={(e)=>getName(e)}/>
                </div>
                <div className="input-offer d-flex">
                  <span>Введите телефон</span>
                  <input className="input-border" id="phone-value" value={inputPhone} name="tel" type="tel" placeholder="Телефон" required onChange={(e)=>getPhone(e)}/>  
                </div>
                <div className="input-offer d-flex">
                  <span>Выберите начальника</span>
                  <select className="select input-border" value={inputBoss.value}  onChange={(e)=>getOptionBoss(e)}>
                    {
                      storageData ? storageData.map((item,index)=> {
                        return (
                          <Option
                            key={index}
                            name={item.name}
                            phone={item.phone}
                            boss={item.boss}
                          />
                        )
                      }) : <option>{inputBoss.value}</option>
                    }
                    <option selected value="not selected">not selected</option>
                  </select>
                </div>                
                <input className="btn" type="submit" value="Сохранить" onClick={()=>getValueForm()}/>
              </form>
            </div>
          </div>
        </div>
       
      </div>      
    </div>
  );
}

export default App;

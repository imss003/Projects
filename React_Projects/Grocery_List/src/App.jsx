import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Content from './Content.jsx'


function App() {
  const [items, setItems] = useState([
      { id: 1, name: 'Item 1', checked: false },
      { id: 2, name: 'Item 2', checked: false },
      { id: 3, name: 'Item 3', checked: false }
  ]);
  function handleCheck(id){
      const listItems = items.map((item) => {
          if(item.id === id){
              item.checked = !item.checked;
              return item;
          }
          else{
              return item;
          }
      });
      localStorage.setItem('listItems', listItems);
      setItems(listItems);
  }
  function handleDelete(id){
      const listITems = items.filter((item) => {
          if(id !== item.id){
              return item;
          }
      })
      localStorage.setItem('listItems', listITems);
      setItems(listITems);
  }
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Content items = {items} handleCheck = {handleCheck} handleDelete = {handleDelete} />
      <Footer items={items}/>
    </div>
  )
}

export default App

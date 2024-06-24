import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Content from './Content.jsx'
import AddItem from './AddItem.jsx'
import SearchItem from './SearchItem.jsx'

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('listItems')));
  const [newItem, setNewItem] = useState('');
  const [searchItem, setSearchItem] = useState('');
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
      localStorage.setItem('listItems', JSON.stringify(listItems));
      setItems(listItems);
  }
  function handleDelete(id){
      const listITems = items.filter((item) => {
          if(id !== item.id){
              return item;
          }
      })
      localStorage.setItem('listItems', JSON.stringify(listITems));
      setItems(listITems);
  }
  function handleSubmit(e){
    e.preventDefault();
    if(newItem == ''){
        return;
    }
    setNewItem('');
    const itemsList = [...items, {id: items.length + 1, name: newItem, checked: false}];
    localStorage.setItem('listItems', JSON.stringify(itemsList));
    setItems(itemsList);
  }
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem
        searchItem = {searchItem}
        setSearchItem = {setSearchItem}
      />
      <Content 
        items = {items.filter((item) => {
            if(searchItem === ''){
                return item;
            }
            else if((item.name.toLocaleLowerCase()).includes(searchItem.toLocaleLowerCase())){
                return item;
            }
        })} 
        handleCheck = {handleCheck} 
        handleDelete = {handleDelete} />
      <Footer items={items}/>
    </div>
  )
}

export default App

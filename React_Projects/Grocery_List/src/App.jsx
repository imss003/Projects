import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Content from './Content.jsx'
import AddItem from './AddItem.jsx'
import SearchItem from './SearchItem.jsx'
import { useEffect } from 'react'

function App() {
  const [items, setItems] = useState((JSON.parse(localStorage.getItem('listItems'))) || []);// if we dont do this then if someone deletes the localstorage key, then our application will fail. hence we use the empty array with or operator.
  const [newItem, setNewItem] = useState('');
  const [searchItem, setSearchItem] = useState('');
  useEffect(() => {
    localStorage.setItem('listItems', JSON.stringify(items)); // we use useeffect to store he changed items inside the listitems to do it efficiently. the dependencies has the array items. so when the items changes the useeffect is called and the localstorage is updated.
  }, [items])
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

      setItems(listItems);
  }
  function handleDelete(id){
      const listITems = items.filter((item) => {
          if(id !== item.id){
              return item;
          }
      })
      setItems(listITems);
  }
  function handleSubmit(e){
    e.preventDefault();
    if(newItem == ''){
        return;
    }
    setNewItem('');
    const itemsList = [...items, {id: items.length + 1, name: newItem, checked: false}];
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

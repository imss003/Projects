import { useEffect, useState } from 'react'
import Header from './Header'
import Content from './Content'
import Filtering from './Filtering'
import AddItem from './AddItem'

function App() {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("localStorage")) || []);
    const [item, setItem] = useState('');
    const [filter, setFilter] = useState('All');
    const [edit, setEdit] = useState(0);
    // useEffect(() => {
        
    // }, [handleSubmit, handleDelete]);
    // function filtering(){
    //   let listItems;
    //   if(filter === 'All'){
    //     return listItems;
    //   }
    //   else if(filter === 'Completed'){
    //     return listItems.filter(item => item.checked === true);
    //   }
    //   else if(filter === 'active'){
    //     return listItems.filter(item => item.checked === false);
    //   }
    // }
    function handleSubmit(e){
        e.preventDefault();
        if(item === ''){
            return;
        }
        // console.log(`item is: ${item}`);
        // console.log('clicked')
        setItem('');
        const listItems = [...items, {id: items.length + 1, name: item, checked: false}];
        setItems(listItems);
        // console.log(listItems);
        localStorage.setItem("localStorage", JSON.stringify(listItems));
    }
    function handleCheck(id){
        items.map((i) => {
            if(i.id === id){
                i.checked = !i.checked;
            }
        })
        localStorage.setItem("localStorage", JSON.stringify(items));
    }
    function handleDelete(id){
        const listItems = items.filter((i) => {
            if(i.id != id){
                return i;
            }
        })
        setItems(listItems);
        localStorage.setItem("localStorage", JSON.stringify(listItems));
    }
    function editing(id){
      
    }
    // useEffect(filtering, [filter]);
    return (
      <>
        <Header/>
        <AddItem
          items={items}
          item={item}
          setItem={setItem}
          handleSubmit={handleSubmit}
        />
        <Filtering
          setFilter={setFilter}
          items={items}
        />
        <Content
          items={items.filter((i) => {
            if(filter === 'All'){
              return i;
            }
            else if(filter === 'completed'){
              if(i.checked === true){
                return i;
              }
            }
            else if(filter === 'active'){
              if(i.checked === false){
                return i;
              }
            }
          })}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
          edit={edit}
          setEdit={setEdit}
        />
      </>
    )
}

export default App

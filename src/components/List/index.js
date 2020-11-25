import React, { useState } from 'react'
//import "./accordion.css";
import "../../index.css";
import Accordion from "../../components/Accordion";
import { fetchBlockData } from '../../utils';
import { act } from '@testing-library/react';

function List(props) {
  const [blocks, setBlocks] = useState([])
  const [show, setShow] = useState(false)

  async function fetchData() {
    setBlocks([])

    const data = await fetchBlockData(10);

    act(() => setBlocks(data));
    act(() => setShow(true));
  }

  return (
    <div>
      <br></br> <br></br>
      <button className="fetch-button" onClick={fetchData}>
       Load Data 
      </button>
      <br></br> <br></br> <br></br>
      {show && <DisplayBlocks blocks={blocks} />}
    </div>
  )
}

 function DisplayBlocks(props) {
  const blocks = props.blocks
  let data = '';

  const displayExtraData = (block) => {
    console.log(block)
    data = JSON.stringify(block)
    console.log(data);
    //alert(data);
  }

    const Accor = blocks.map(e =>
   
    <Accordion
    key={e.id}
    title={e.id}
    content={
      
      `
      action_mroot: ${e.action_mroot} <br>
      block_num: ${e.block_num} <br>
      confirmed: ${e.confirmed} <br>
      id: ${e.id} <br>
      new producers - ${e.new_producers} <br>
      previous: ${e.previous} <br>
      producer: ${e.producer} <br>
      producer_signature: ${e.producer_signature} <br>
      ref_block_prefix: ${e.ref_block_prefix} <br>
      schedule_version: ${e.schedule_version} <br>
      timestamp: ${e.timestamp} <br>
      transaction_mroot: ${e.transaction_mroot}
      `
    }
    >
    
    </Accordion>)

  return (
    <> 
    <ul>
    { Accor } 
    </ul>        
    </>
  )
}


export default List

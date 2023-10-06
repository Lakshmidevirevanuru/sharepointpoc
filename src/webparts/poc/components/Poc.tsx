import * as React from 'react';
 //import styles from './Poc.module.scss';
 import type { IPocProps } from './IPocProps';
 //import { escape } from '@microsoft/sp-lodash-subset';
 import InputForm from './InputForm';
 import {DisplayList} from './DisplayList';

export default class Poc extends React.Component<IPocProps, {}>{

  
  public render(): React.ReactElement<IPocProps> {
   
    function handleChangeName(newName: string): void {
     
    }

    return (
      <div>
        <InputForm listName="TestList"
    context={this.props.context} onChangeName={handleChangeName}/>
        <DisplayList
    listName="TestList"
    spHttpClient={this.props.spHttpClient}
  />
      </div>
      
    );
  }
}

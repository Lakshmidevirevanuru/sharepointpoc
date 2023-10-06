import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface ISPList {
  Title: string;
  Id: string;
  Feedback:string;
}

export const DisplayList: React.FunctionComponent<{listName: string, spHttpClient: SPHttpClient}> = ({listName, spHttpClient}) => {
  const [items, setItems] = React.useState<ISPList[]>([]);

  React.useEffect(() => {
    spHttpClient.get(`/sites/SpinversePOC/_api/web/lists/getbytitle('${listName}')/items`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((data: { value: ISPList[] }) => {
        setItems(data.value);
      });
  }, []);
if(!items) return <div>yet to get data</div>
  return (
    <div>
      <h2>List Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.Id}>{item.Title} - {item.Feedback}</li>
        ))}
      </ul>
    </div>
  );
};
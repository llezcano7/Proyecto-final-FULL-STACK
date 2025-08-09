import { Tabs } from './components/tabs';
import { Content } from './components/content';
import { useState } from 'react';
import endpoint from './components/endpoint.json';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import './styles.css'



function App() {
  const [content, setContent] = useState(endpoint[0]);
  const toogleContent = (data) => setContent(data);

  return (
    <>
      <div className='content'>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={25} minSize={0} maxSize={75}>
            <Tabs toogleContent={toogleContent} />
          </Panel>
          <PanelResizeHandle className="handle" />
          <Panel minSize={25} defaultSize={75}>
            <Content content={content} />
          </Panel>
        </PanelGroup>
      </div>
    </>
  )
}

export default App

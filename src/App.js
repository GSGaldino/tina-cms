import React from 'react';
import { TinaProvider, TinaCMS, useCMS, useForm, usePlugin } from 'tinacms';

function App() {
  const [pageData, setPageData] = React.useState({
    title: "Teste",
    body: "Teste de conteúdo tinaCMS"
  })

  function PageContent() {

    // 2. Define the form configuration object
    const formConfig = {
      id: 'tina-tutorial-index',
      label: 'Edit Page',
      fields: [
        {
          name: 'title',
          label: 'Title',
          component: 'text',
        },
        {
          name: 'body',
          label: 'Body',
          component: 'textarea',
        },
      ],
      initialValues: pageData,
      onSubmit: async (content) => {
        setPageData(content);
      },
    }

    // 3. Create the form
    const [editableData, form] = useForm(formConfig)

    // 4. Register it with the CMS
    usePlugin(form)

    return (
      <section className="App-header">
        {/**
           * 5. Render the `editableData` returned from `useForm`
           */}
        <h1>{editableData.title}</h1>
        <p>{editableData.body}</p>
        <EditButton />
      </section>
    );
  }

  const cms = new TinaCMS({
    sidebar: true,
  });

  return (
    <TinaProvider cms={cms}>
      <div className="App">
        <p>Tina CMS</p>
      </div>
      <PageContent />
    </TinaProvider>
  );
}

function EditButton() {
  const cms = useCMS();
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  );
}

export default App;

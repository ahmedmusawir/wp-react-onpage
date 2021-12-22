import React from 'react';
import Page from '../components/layouts/Page';
import Content from '../components/layouts/Content';
import DoWpapiOne from '../components/DoWpapiOne';

function WpapiOnePage() {
  return (
    <Page wide={false} pageTitle="Home Page">
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <Content width="w-100" cssClassNames="bg-light mt-3">
            <h1>WPAPI Test One</h1>
            <h4>Add Topic Here...</h4>
          </Content>
          <Content width="w-100" cssClassNames="bg-light mt-3">
            <pre>
              <DoWpapiOne />
            </pre>
          </Content>
        </div>
      </div>
    </Page>
  );
}

export default WpapiOnePage;

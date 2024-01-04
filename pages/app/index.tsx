import React from 'react';

const AppPage = () => {
  // Your component logic here
  return <div>This is the App page</div>;
};

export async function getServerSideProps() {
  // Fetch data here if needed
  return {
    props: {}, // Add data if needed
  };
}

export default AppPage;
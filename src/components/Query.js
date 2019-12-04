import React from 'react';

/**
 * useQuery
 * @param {{query: Promise}}
 */
function Query({ query, children }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState(null);

  const fetch = React.useCallback(() => {
    query()
      .then(result => setData(result))
      .catch(result => setError(result))
      .finally(() => setLoading(false));
  }, [query]);

  React.useEffect(() => fetch(), [fetch]);

  return <>{children({ loading, error, data, refetch: fetch })}</>;
}

export default Query;

function DetailsPage() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Details Page</h1>
      <p>{data.user.name}</p>
      <p>{data.user.email}</p>
      <p>{data.user.age}</p>
    </div>
  );
}
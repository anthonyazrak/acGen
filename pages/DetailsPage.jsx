import React from "react";
import { View, Text } from "react-native";

function DetailsPage() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <View>
      <Text>Details Page</Text>
      <Text>{data.user.name}</Text>
      <Text>{data.user.email}</Text>
      <Text>{data.user.age}</Text>
    </View>
  );
}
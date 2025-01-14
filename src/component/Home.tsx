import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const languag = [
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "French",
    code: "fr",
  },
];
const Home = () => {
  const navigate = useNavigate();

  const languageSelectHandler = (language: string): void => {
    navigate(`/learn?language=${language}`);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" p={"2rem"} textAlign={"center"}>
        Welcome,Lets learn something new!
      </Typography>
      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center "}
      >
        {languag.map((i) => (
          <Button
            key={i.code}
            variant="contained"
            onClick={() => languageSelectHandler(i.code)}
          >
            {i.name}
          </Button>
        ))}
      </Stack>
    </Container>
  );
};

export default Home;

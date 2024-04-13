import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchAudio, translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  getSuccessRequest,
  getWordFailureRequest,
  getWordRequest,
} from "../redux/slice";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const audioRef = useRef(null);
  const params = useSearchParams()[0].get("language") as LangType;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const words = useSelector((state: StateType) => state.words);
  const loading = useSelector((state: StateType) => state.loading);

  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;

    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(words[count]?.word, params);
      console.log(data);

      setAudioSrc(data);
    }
  };

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("");
  };

  useEffect(() => {
    dispatch(getWordRequest());
    translateWords(params)
      .then((arr) => {
        console.log(arr);

        dispatch(getSuccessRequest(arr));
      })
      .catch((e) => {
        dispatch(getWordFailureRequest(e));
      });
  }, []);
  if (loading) {
    // Handle the case where words is undefined or an empty array
    return <Loader />;
  }
  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: "1rem",
      }}
    >
      {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}

      <Button
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        <ArrowBack />
      </Button>
      <Typography m={"2rem 0"}>Learning Made Easy</Typography>

      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant={"h4"}>
          {count + 1} - {words[count]?.word}
        </Typography>
        <Typography color={"blue"} variant="h4">
          : {words[count]?.meaning}
        </Typography>
        <Button
          sx={{
            borderRadius: "50%",
          }}
          onClick={audioHandler}
        >
          <VolumeUp />
        </Button>
      </Stack>
      <Button
        sx={{
          margin: "3rem 0",
        }}
        variant="contained"
        fullWidth
        onClick={count === 8 - 1 ? () => navigate("/quiz") : nextHandler}
      >
        {count === 8 - 1 ? "Test" : "Next"}
      </Button>
    </Container>
  );
};

export default Learning;

import React, { useState } from "react";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { Box } from "@mui/material";

const colors = {
    colorGrey: "#c7d1d3",
    colorUp: "green",
    colorDown: "red"
}

const StyledCustomInput = styled(InputBase)(
({ color }) => `
    width: 70vw;
    font-family: sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 0px 12px;
    border-radius: 8px;
    color: ${color};
    border: 1px solid ${color};
    background: transparent;
    `
);

export function ThumbsWithQualiFeedback(props) {
    const [thumbScore, setThumbScore] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [inputText, setInputText] = useState(null);

    let thumbUpColor;
    let thumbHoverUpColor;
    let thumbDownColor;
    let thumbHoverDownColor;
    if (thumbScore === "up") {
        thumbUpColor = colors["colorUp"]
        thumbHoverUpColor = colors["colorUp"]
        thumbDownColor = submitted ? "transparent" : colors["colorGrey"]
        thumbHoverDownColor = submitted ? "transparent" : colors["colorDown"]
    } else if (thumbScore === "down") {
        thumbUpColor = submitted ? "transparent" : colors["colorGrey"]
        thumbHoverUpColor = submitted ? "transparent" : colors["colorUp"]
        thumbDownColor = colors["colorDown"]
        thumbHoverDownColor = colors["colorDown"]
    } else {
        thumbUpColor = colors["colorGrey"]
        thumbHoverUpColor = colors["colorUp"]
        thumbDownColor = colors["colorGrey"]
        thumbHoverDownColor = colors["colorDown"]
    }

    if (submitted) {
        thumbUpColor = thumbScore === "up" ? colors["colorUp"] : "transparent"
        thumbHoverUpColor = thumbScore === "up" ? colors["colorUp"] : "transparent"
        thumbDownColor = thumbScore === "down" ? colors["colorDown"] : "transparent"
        thumbHoverDownColor = thumbScore === "down" ? colors["colorDown"] : "transparent"
    }


    const handleThumbClick = (score) => {
        if (score === thumbScore) {
            setThumbScore(null);
        } else {
            setThumbScore(score);
        }
    };

    const handleTextInput = (text) => {
        setInputText(text.currentTarget.value);
    };

    const handleSubmission = () => {
        setSubmitted(true);
        props.submitFeedback(thumbScore, inputText);
    };

    console.log(submitted ? "yeh" : "hello")

    return (
        <Box paddingY={0.5}>
            <Stack direction="row" spacing={1} justifyContent={props.align}>
                <ThumbUpOffAltIcon
                sx={{
                    fontSize: 28,
                    color: thumbUpColor,
                    '&:hover': {
                        cursor: submitted ? null : "pointer",
                        color: thumbHoverUpColor,
                    }, }}
                onClick={() => submitted ? {} : handleThumbClick("up")}
                />
                <ThumbDownOffAltIcon
                sx={{
                    fontSize: 28,
                    color: thumbDownColor,
                    '&:hover': {
                        cursor: submitted ? null : "pointer",
                        color: thumbHoverDownColor,
                }, }}
                onClick={() => submitted ? {} : handleThumbClick("down")}
                />
                {submitted === false && thumbScore !== null ? <StyledCustomInput onChange={handleTextInput} aria-label="Demo input" placeholder={props.optionalTextLabel} color={thumbScore === "up" ? colors["colorUp"] : colors["colorDown"]}/> : null}
                {submitted === false && thumbScore !== null ? <Button sx={{color: thumbScore === "up" ? colors["colorUp"] : colors["colorDown"]}} variant="text" size="small" onClick={handleSubmission}>Submit</Button> : null}
            </Stack>
        </Box>
        )
    }

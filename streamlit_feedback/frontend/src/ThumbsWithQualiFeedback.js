import React, { useState, useEffect } from "react";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EditIcon from '@mui/icons-material/Edit';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";

const colors = {
    colorGrey: "#c7d1d3",
    colorUp: "#4caf50",
    colorDown: "#f44336",
    colorReason: "#b71c1c"
}

const TextFieldcolors = {
    colorUp: "success",
    colorDown: "error"
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

const StyledTextField = styled(TextField)(
    ({ color }) => `
        width: 60vw;
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
    const [selectedReason, setSelectedReason] = useState(null);

    const options = [
        { key: "Hallucination", icon: <ErrorOutlineIcon />, description: "Hallucination - The response contains fabricated or incorrect information." },
        { key: "Irrelevant", icon: <CancelIcon />, description: "Irrelevant - The response doesn't address the question or context." },
        { key: "Incomplete", icon: <EditIcon />, description: "Incomplete - The response is missing critical information or context." },
        { key: "Offensive/Inappropriate", icon: <WarningIcon />, description: "Offensive/Inappropriate - The response contains inappropriate, biased, or harmful content." },
        { key: "Too Complex/Unclear", icon: <HelpOutlineIcon />, description: "Too Complex/Unclear - The response is overly complicated or hard to understand." },
    ];

    useEffect(() => {
        if (props.disableWithScore) {
            setSubmitted(true);
            setThumbScore(props.disableWithScore);
        }
    }, [props.disableWithScore])

    let thumbUpColor;
    let thumbHoverUpColor;
    let thumbDownColor;
    let thumbHoverDownColor;
    if (thumbScore === "👍") {
        thumbUpColor = colors["colorUp"]
        thumbHoverUpColor = colors["colorUp"]
        thumbDownColor = submitted ? "transparent" : colors["colorGrey"]
        thumbHoverDownColor = submitted ? "transparent" : colors["colorDown"]
    } else if (thumbScore === "👎") {
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
        thumbUpColor = thumbScore === "👍" ? colors["colorUp"] : "transparent"
        thumbHoverUpColor = thumbScore === "👍" ? colors["colorUp"] : "transparent"
        thumbDownColor = thumbScore === "👎" ? colors["colorDown"] : "transparent"
        thumbHoverDownColor = thumbScore === "👎" ? colors["colorDown"] : "transparent"
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

    const handleOptionClick = (option) => {
        setSelectedReason(selectedReason === option ? null : option);
    }

    const handleSubmission = () => {
        const feedbackData = {
            thumbScore,
            reason: selectedReason,
            inputText,
        }
        props.submitFeedback(feedbackData);
        setSubmitted(true);
    };

    if (props.maxTextLength != null) {
        return (
            <Box paddingY={0.5} height={140} component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }} noValidate autoComplete="off">
                <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                    <ThumbUpOffAltIcon
                        sx={{
                            fontSize: 28,
                            color: thumbUpColor,
                            '&:hover': {
                                cursor: submitted ? null : "pointer",
                                color: thumbHoverUpColor,
                            },
                        }}
                        onClick={() => submitted ? {} : handleThumbClick("👍")}
                    />
                    <ThumbDownOffAltIcon
                        sx={{
                            fontSize: 28,
                            color: thumbDownColor,
                            '&:hover': {
                                cursor: submitted ? null : "pointer",
                                color: thumbHoverDownColor,
                            },
                        }}
                        onClick={() => submitted ? {} : handleThumbClick("👎")}
                    />
                    {submitted === false && (thumbScore === "👍" || (thumbScore === "👎" && selectedReason)) && ( <StyledTextField id="outlined-multiline-static" inputProps={{ maxLength: props.maxTextLength }} onChange={handleTextInput} multiline rows={4} placeholder={props.optionalTextLabel} aria-label="Demo input" color={thumbScore === "👍" ? TextFieldcolors["colorUp"] : TextFieldcolors["colorDown"]} /> : null)}
                    {submitted === false && (thumbScore === "👍" || (thumbScore === "👎" && selectedReason)) && ( <Button sx={{ color: thumbScore === "👍" ? colors["colorUp"] : colors["colorDown"] }} variant="text" size="small" onClick={handleSubmission}>Submit</Button> : null)}
                </Stack>
                {thumbScore === "👎" && !submitted && (
                    <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center" marginTop={2}>
                        {options.map((option) => (
                            <Tooltip key={option.key} title={option.description} enterDelay={500}>
                                <Button
                                    onClick={() => handleOptionClick(option.key)}
                                    sx={{
                                        fontSize: 20,
                                        padding: 0,
                                        minWidth: "auto",
                                        height: "auto",
                                        color: selectedReason === option.key ? colors.colorReason : colors.colorGrey,
                                        '&:hover': {
                                            cursor: "pointer",
                                            color: colors.colorReason,
                                        }
                                    }}
                                >
                                    {option.icon}
                                </Button>
                            </Tooltip>
                        ))}
                    </Stack>
                )}
            </Box>
        )
    }
    else {
        return (
            <Box paddingY={0.5}>
                <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                    <ThumbUpOffAltIcon
                        sx={{
                            fontSize: 28,
                            color: thumbUpColor,
                            '&:hover': {
                                cursor: submitted ? null : "pointer",
                                color: thumbHoverUpColor,
                            },
                        }}
                        onClick={() => submitted ? {} : handleThumbClick("👍")}
                    />
                    <ThumbDownOffAltIcon
                        sx={{
                            fontSize: 28,
                            color: thumbDownColor,
                            '&:hover': {
                                cursor: submitted ? null : "pointer",
                                color: thumbHoverDownColor,
                            },
                        }}
                        onClick={() => submitted ? {} : handleThumbClick("👎")}
                    />
                    {submitted === false && (thumbScore === "👍" || (thumbScore === "👎" && selectedReason)) && ( <StyledCustomInput onChange={handleTextInput} aria-label="Demo input" placeholder={props.optionalTextLabel} color={thumbScore === "👍" ? colors["colorUp"] : colors["colorDown"]} /> : null)}
                    {submitted === false && (thumbScore === "👍" || (thumbScore === "👎" && selectedReason)) && ( <Button sx={{ color: thumbScore === "👍" ? colors["colorUp"] : colors["colorDown"] }} variant="text" size="small" onClick={handleSubmission}>Submit</Button> : null)}
                </Stack>
                {thumbScore === "👎" && !submitted && (
                    <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center" marginTop={2}>
                        {options.map((option) => (
                            <Tooltip key={option.key} title={option.description} enterDelay={500}>
                                <Button
                                    onClick={() => handleOptionClick(option.key)}
                                    sx={{
                                        fontSize: 20,
                                        padding: 0,
                                        minWidth: "auto",
                                        height: "auto",
                                        color: selectedReason === option.key ? colors.colorReason : colors.colorGrey,
                                        '&:hover': {
                                        cursor: "pointer",
                                            color: colors.colorReason,
                                        }
                                    }}
                                >
                                    {option.icon}
                                </Button>
                            </Tooltip>
                        ))}
                    </Stack>
                )}
            </Box>
        )
    }
}
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const CreatePost = ({
	user,
	isModalOpen,
	handleModal,
	handleSubmit,
	handleRadioChange,
	handleDateChange,
	date,
}) => {
	return (
		<Dialog open={isModalOpen} onClose={handleModal}>
			<DialogTitle style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
				New Post
			</DialogTitle>

			<DialogContent className="modal">
				<FormControl>
					<FormLabel
						id="demo-row-radio-buttons-group-label"
						className="form-label"
					>
						Service Required
					</FormLabel>
					<RadioGroup
						row
						aria-labelledby="demo-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
					>
						<FormControlLabel
							value="Dog Sitter"
							control={<Radio />}
							label="Dog Sitter"
							name="service"
							onChange={handleRadioChange}
						/>
						<FormControlLabel
							value="Dog Walker"
							control={<Radio />}
							label="Dog Walker"
							name="service"
							onChange={handleRadioChange}
						/>
						<FormControlLabel
							value="Dog Boarding"
							control={<Radio />}
							label="Dog Boarding"
							name="service"
							onChange={handleRadioChange}
						/>
					</RadioGroup>
				</FormControl>
				<br />
				<br />
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker
						label="Date&Time"
						value={date}
						name="date"
						inputFormat="DD-MM-YYYY HH:MM"
						onChange={handleDateChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
				<br />
				<br />
				<TextField
					autoFocus
					defaultValue={user.user.firstName + " " + user.user.lastName}
					margin="dense"
					id="location"
					label="Created By"
					type="Location"
					fullWidth
					required
					variant="outlined"
					disabled={true}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleModal}>Cancel</Button>
				<Button onClick={handleSubmit}>Create</Button>
			</DialogActions>
		</Dialog>
	);
};

export const RadioForm = () => {};
export default CreatePost;

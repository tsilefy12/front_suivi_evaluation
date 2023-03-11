import {
	Box,
	Button,
	Card,
	Container,
	Divider,
	Grid,
	IconButton,
	Stack,
	styled,
	TextField,
	Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyValue from "../shared/keyValue";

const ListMissions = () => {
	return (
		<Container maxWidth="xl">
			<SectionNavigation direction="row" justifyContent="space-between" mb={1}>
				<Link href="/missions/add">
					<Button color="primary" variant="contained" startIcon={<Add />}>
						Créer
					</Button>
				</Link>
				<Typography variant="h4" color="GrayText">
					Missions
				</Typography>
			</SectionNavigation>
			<Divider />
			<SectionDetails>
				<Stack
					direction="row"
					sx={{
						flex: "1 1 100%",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h5" id="tableTitle" component="div">
						Liste des Missions
					</Typography>
					<TextField
						variant="outlined"
						id="search"
						name="search"
						placeholder="Recherche"
						size="small"
					/>
				</Stack>
				<Grid container spacing={2} mt={2}>
					{[1, 2, 3, 4].map((item) => (
						<Grid key={item} item xs={12} md={6} lg={4}>
							<LinkContainer>
								<CardHeader
									direction="row"
									justifyContent="space-between"
									alignItems="center"
								>
									<Typography variant="h6" color="GrayText">
										REF REF_MISSION_001
									</Typography>
									<Stack direction="row" spacing={1}>
										<IconButton size="small" color="accent">
											<Edit fontSize="small" />
										</IconButton>
										<IconButton size="small" color="warning">
											<CancelIcon fontSize="small" />
										</IconButton>
									</Stack>
								</CardHeader>

								<CardBody>
									<Typography color="GrayText" my={2} variant="caption">
										Description de la mission de la mission description de la
										mssion
									</Typography>
									<Stack spacing={1}>
										<KeyValue keyName="Responsable" value="Andry Blame" />
										<KeyValue keyName="Gestionnaire " value="Andry Blame" />
									</Stack>
								</CardBody>

								<CardFooter>
									<Stack direction="row">
										<Link href="/missions/id/gereEtat">
											<Button variant="text" color="info">
												Gérer Etat de prévision
											</Button>
										</Link>
										<Link href="/missions/id/bilan">
											<Button variant="text" color="info">
												Voir le Bilan
											</Button>
										</Link>
									</Stack>
									<Link href="/missions/id/gereRapport">
										<Button variant="text" color="info">
											Gérer Rapport
										</Button>
									</Link>
								</CardFooter>
							</LinkContainer>
						</Grid>
					))}
				</Grid>
			</SectionDetails>
		</Container>
	);
};

export default ListMissions;

export const SectionNavigation = styled(Stack)(({}) => ({}));

const SectionDetails = styled(Box)(({ theme }) => ({
	padding: theme.spacing(3),
	marginBlock: 15,
	background: theme.palette.common.white,
	borderRadius: 20,
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
}));

const LinkContainer = styled("div")(({ theme }) => ({
	borderRadius: theme.spacing(2),
	background: "#fff",
	border: `1px solid ${theme.palette.grey[100]}`,
}));

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const CardFooter = styled("div")(({ theme }) => ({
	background: theme.palette.grey[100],
	paddingInline: theme.spacing(2),
	paddingBlock: theme.spacing(1),
	borderBottomLeftRadius: theme.spacing(2),
	borderBottomRightRadius: theme.spacing(2),
}));

const CardHeader = styled(Stack)(({ theme }) => ({
	paddingInline: theme.spacing(3),
	marginTop: theme.spacing(2),
}));

const CardBody = styled(Stack)(({ theme }) => ({
	paddingInline: theme.spacing(3),
	paddingBottom: theme.spacing(1),
}));

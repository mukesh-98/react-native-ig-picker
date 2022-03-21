import {
	View,
	Text,
	Button,
	Image,
	Dimensions,
	TouchableWithoutFeedback,
	ScrollView,
} from "react-native";
import Slider from "react-native-slider";
import React from "react";
import { showImagePicker } from "react-native-ig-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import Carousel from "react-native-snap-carousel";
import {
	Feather,
	Foundation,
	Ionicons,
	MaterialIcons,
	SimpleLineIcons,
} from "@expo/vector-icons";

export default function App() {
	const carousel = React.useRef();

	const [model, setModal] = React.useState(false);

	const [images, setImages] = React.useState([]);

	const [active, setActive] = React.useState(null);

	const [tabSelect, setTabSelect] = React.useState("Filter");

	const [multiple, setMultiple] = React.useState(false);

	const [activeFilter, setActiveFilter] = React.useState(null);

	React.useEffect(() => {
		if (model) {
			openPicker();
		}
	}, [model]);

	const openPicker = React.useCallback(async () => {
		const response = await showImagePicker({
			showCamera: true,
			videoSinglePick: false,
			singlePickWithAutoComplete: false,
			imageOnly: true,
			videoOnly: false,
			maxCount: 5,
			columnCount: 4,
		});
		setImages(response);
		setMultiple(response.length > 1);
	}, []);

	function _renderItem({ item, index }) {
		return (
			<View
				style={{
					backgroundColor: "grey",
					borderRadius: 5,
					// height: "70%",
				}}
			>
				<Image
					resizeMode="contain"
					source={{ uri: item.path }}
					style={{ height: "100%", width: "100%" }}
				/>
				{/* <Text style={{ fontSize: 30 }}>{item.title}</Text>
				<Text>{item.text}</Text> */}
			</View>
		);
	}

	// if (response.length === 1) {
	// 	response.map((image) => {
	// 		ImagePicker.openCropper({
	// 			path: image.path,
	// 			width: 300,
	// 			height: 400,
	// 		}).then((image) => {
	// 			console.log(image);
	// 		});
	// 	});
	// } else {
	// 	response.map((image) => {
	// 		ImagePicker.openCropper({
	// 			path: image.path,
	// 			width: 300,
	// 			height: 400,
	// 		}).then((image) => {
	// 			console.log(image);
	// 		});
	// 	});
	// }

	// console.log("ACTIVE", active);

	const iconArray = [
		{
			type: Feather,
			name: "sun",
			label: "Brightness",
			color: "white",
			size: 30,
			onPress: () => setActiveFilter("Brightness"),
		},
		{
			type: Foundation,
			name: "contrast",
			label: "Contrast",
			color: "white",
			size: 30,
			onPress: () => setActiveFilter("Contrast"),
		},
		{
			type: Feather,
			name: "triangle",
			label: "Structure",
			color: "white",
			size: 30,
			onPress: () => setActiveFilter("Structure"),
		},

		{
			type: Ionicons,
			name: "md-thermometer-outline",
			label: "Warmth",
			color: "white",
			size: 30,
			onPress: () => setActiveFilter("Warmth"),
		},

		{
			type: SimpleLineIcons,
			name: "drop",
			label: "Saturation",
			color: "white",
			size: 30,
			onPress: () => setActiveFilter("Saturation"),
		},
		{
			type: MaterialIcons,
			name: "tonality",
			label: "Highlights",
			color: "white",
			size: 30,
			onPress: () => setActiveFilter("Highlights"),
		},
	];

	const editTab = () => {
		if (
			activeFilter &&
			iconArray.filter((ele) => ele.label === activeFilter).length > 0
		) {
			return (
				<View
					style={{
						width: "100%",
						height: "100%",
						// display: "flex",
						// flexDirection: "row",
						// alignItems: "center",
					}}
				>
					<Text style={{ color: "#FFF" }}>{activeFilter}</Text>
					<Slider
						style={{ width: 380, height: "100%" }}
						minimumValue={0}
						maximumValue={1}
						minimumTrackTintColor="#FFFFFF"
						maximumTrackTintColor="#333"
						thumbTouchSize={{
							width: 30,
							height: 30,
						}}
					/>
				</View>
			);
		} else {
			return (
				<ScrollView
					horizontal
					style={{
						marginHorizontal: 10,
					}}
				>
					{iconArray.map((ele, index) => (
						<TouchableWithoutFeedback key={index} onPress={ele.onPress}>
							<View
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<Text style={{ color: "#FFF", fontSize: 12 }}>{ele.label}</Text>
								<View
									onPress={ele.onPress}
									style={{
										height: 80,
										width: 80,
										borderWidth: 0.5,
										borderColor: "white",
										borderRadius: 50,
										display: "flex",
										alignItems: "center",
										margin: 5,
										justifyContent: "center",
									}}
								>
									<ele.type {...ele} onPress={ele.onPress} />
								</View>
							</View>
						</TouchableWithoutFeedback>
					))}
				</ScrollView>
			);
		}
	};

	const editorArea = (
		<View style={{ height: "100%", backgroundColor: "black", display: "flex" }}>
			<View
				style={{
					height: 50,
					alignItems: "center",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Feather
					name="arrow-left"
					size={24}
					color="white"
					onPress={() => setModal(false)}
				/>
				<Feather name="arrow-right" size={24} color="white" />
			</View>
			<Carousel
				layout={"default"}
				// style={{ height: "70%" }}
				ref={carousel}
				hasParallaxImages={true}
				data={images}
				sliderWidth={Dimensions.get("screen").width}
				itemWidth={Dimensions.get("screen").width}
				renderItem={_renderItem}
				onSnapToItem={(index) => setActive(images[index])}
			/>
			<View style={{ width: "100%", height: 110, marginVertical: 20 }}>
				{editTab()}
			</View>
			{activeFilter ? (
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-end",
						paddingBottom: 10,
					}}
				>
					<TouchableWithoutFeedback onPress={() => setActiveFilter(null)}>
						<View
							style={{
								width: "50%",
								borderWidth: 2,
								paddingBottom: 5,
							}}
						>
							<Text style={{ textAlign: "center", color: "white" }}>
								CANCEL
							</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => setActiveFilter(null)}>
						<View
							style={{
								width: "50%",
								borderWidth: 2,
								paddingBottom: 5,
							}}
						>
							<Text style={{ textAlign: "center", color: "white" }}>DONE</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			) : (
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-end",
						paddingBottom: 10,
					}}
				>
					<TouchableWithoutFeedback
						onPress={() => {
							setTabSelect("Filter");
						}}
					>
						<View
							style={{
								width: "50%",
								borderBottomColor:
									tabSelect === "Filter" ? "white" : "transparent",
								borderWidth: 2,
								paddingBottom: 5,
							}}
						>
							<Text style={{ textAlign: "center", color: "white" }}>
								Filter
							</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback
						onPress={() => {
							setTabSelect("Edit");
						}}
					>
						<View
							style={{
								width: "50%",
								borderBottomColor:
									tabSelect === "Edit" ? "white" : "transparent",
								borderWidth: 2,
								paddingBottom: 5,
							}}
						>
							<Text style={{ textAlign: "center", color: "white" }}>Edit</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			)}
		</View>
	);
	return (
		<View>
			{!model ? (
				<Button
					title="Open Modal"
					onPress={() => {
						setModal(true);
					}}
				/>
			) : (
				editorArea
			)}
		</View>
	);
}

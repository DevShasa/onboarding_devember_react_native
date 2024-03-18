import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
	GestureDetector,
	Gesture,
	Directions,
} from "react-native-gesture-handler";
import Animated, {
	BounceInRight,
	SlideInLeft,
	BounceInLeft,
	FadeIn,
	FadeOut,
    SlideOutRight,
    SlideInRight,
    SlideOutLeft,
} from "react-native-reanimated";

const onboardingSteps = [
	{
		title: "Track Every Transaction",
		description: `Monitor your spending and contribution, ensuring every penny aligns with your family's aspiration`,
		iconName: "people-arrows",
	},
	{
		title: "Unlock Financial Freedom",
		description: `Provides a flexible API for accessing device safe area inset information. This allows you to position your indicators,`,
		iconName: "money-bill-wave",
	},
	{
		title: "Walapangalaz my bru",
		description: `This tutorial should teach you how to create an onboarding flow that encompasses neat animations`,
		iconName: "angellist",
	},
];

const Onboarding = () => {
	const [screenIndex, setScreenIndex] = useState(0);


	const data = onboardingSteps[screenIndex];
	const router = useRouter();

	const onContinue = () => {
		setScreenIndex((prev) => {
			if (prev === onboardingSteps.length - 1) {
				endOnboarding();
			}
			return prev + 1;
		});
	};

	const onBack = () => {
		setScreenIndex((prev) => {
			if (prev === 0) {
				// GO TO THE BEGINNING ?
				return onboardingSteps.length - 1;
			}
			return prev - 1;
		});
	};

	const endOnboarding = () => {
		setScreenIndex(0), router.replace("/(days)/day2");
	};

	const swipeForward = Gesture.Fling()
		.runOnJS(true)
		.direction(Directions.LEFT)
		.onStart((event) => {
			console.log("FLING LEFT --->", event);
			onContinue();
		});
	const swipeBack = Gesture.Fling()
		.runOnJS(true)
		.direction(Directions.RIGHT)
		.onStart((event) => {
			console.log("FLING RIGHT --->", event);
			onBack();
		});

	const swipes = Gesture.Simultaneous(swipeForward, swipeBack);

	return (
		<SafeAreaView style={styles.page}>
			<Stack.Screen options={{ headerShown: false }} />
			<StatusBar style="light" />
			<View style={styles.stepIndicatorContainer}>
				{onboardingSteps.map((step, index) => {
					const backColor =
						index === screenIndex ? "#CEF202" : "gray";
					return (
						<View
							style={[
								styles.stepIndicator,
								{ backgroundColor: backColor },
							]}
							key={step.title}
						></View>
					);
				})}
			</View>
			<GestureDetector gesture={swipes}>
				<View
					//entering={BounceInRight}
					style={styles.pageContent}
					key={screenIndex}
				>
					<Animated.View
						entering={FadeIn}
						exiting={FadeOut}
					>
						<FontAwesome5
							name={data?.iconName}
							size={100}
							color="#CEF202"
							style={styles.image}
						/>
					</Animated.View>

					<View style={styles.footer}>
						<Animated.Text
							entering={SlideInRight}
							style={styles.title}
                            exiting={SlideOutLeft}
						>
							{data?.title}
						</Animated.Text>
						<Animated.Text
							entering={SlideInRight.delay(50   )}  
							style={styles.description}
                            exiting={SlideOutLeft}
						>
							{data?.description}
						</Animated.Text>
						<View style={styles.buttonsRow}>
							<Text style={styles.buttonText} onPress={endOnboarding} > Skip </Text>
							<Pressable style={styles.button} onPress={onContinue} >
								<Text style={styles.buttonText}>Continue</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</GestureDetector>
		</SafeAreaView>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	page: {
		// alignItems: "center",
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#15141A",
		// marginTop: 20
	},
	title: {
		color: "#fdfdfd",
		fontSize: 50,
		fontFamily: "InterBlack",
		letterSpacing: 1.3,
		marginVertical: 20,
	},
	description: {
		color: "gray",
		fontSize: 20,
		fontFamily: "Inter",
		lineHeight: 27,
	},
	subTitle: {},
	image: {
		alignSelf: "center",
		margin: 20,
		marginTop: 50,
	},
	footer: {
		marginTop: "auto",
	},
	pageContent: {
		padding: 20,
		flex: 1,
	},
	button: {
		backgroundColor: "#302E38",
		borderRadius: 50,
		alignItems: "center",
		flex: 1,
	},
	buttonsRow: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
	buttonText: {
		color: "#fdfdfd",
		fontFamily: "InterSemi",
		fontSize: 16,
		padding: 15,
		paddingHorizontal: 25,
	},
	stepIndicatorContainer: {
		flexDirection: "row",
		gap: 8,
		margin: 10,
		marginTop: 40,
	},
	stepIndicator: {
		flex: 1,
		height: 3,
	},
});

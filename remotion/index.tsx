import { registerRoot, Composition } from "remotion";
import MarketingVideo from "../app/components/MarketingVideo";

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MarketingVideo"
        component={MarketingVideo}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          query: "منتجات متنوعة",
          countryName: "الخليج ومصر",
          products: [],
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
import { registerRoot, Composition } from "remotion";
import MarketingVideo from "../app/components/MarketingVideo";
import StorePromoVideo from "../app/components/StorePromoVideo";

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

      <Composition
        id="StorePromoVideo"
        component={StorePromoVideo}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          query: "عروض المتجر",
          countryName: "الخليج ومصر",
          products: [],
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
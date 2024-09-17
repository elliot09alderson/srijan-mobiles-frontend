import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages,deleteFeatureImage } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";


function AdminDashboard() {
  const { toast } = useToast();

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  // console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {

    if(uploadedImageUrl){

      dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages());
          setImageFile(null);
          setUploadedImageUrl("");
        }
      });
    }

    else{

     
        toast({
          title: "Please select the image first",
          variant: "destructive",
        });
     
      console.log("please upload image correctly ======>>>>")
    }
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} disabled={!uploadedImageUrl} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative  ring-2  rounded-lg ring-gray-300 shadow-sm">
                <img
                  src={featureImgItem.image}
                  className=" h-[300px] w-full shadow-md object-cover rounded-t-lg"
                />

                <div className="h-8 w-8 absolute right-1 cursor-pointer  bg-red-600 text-white top-1 rounded-full flex items-center justify-center " onClick={()=>{
                  
                  
                  console.log(featureImgItem._id)
                  dispatch(deleteFeatureImage(featureImgItem._id))}}>

                  
                <Trash size={16} />
                
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;

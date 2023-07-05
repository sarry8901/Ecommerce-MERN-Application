import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";


export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is Required" });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New Category created",
      category,
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

export const updateCategoryController=async(req,res)=>{
   try {
    const {name}= req.body;
    const {id}= req.params
    const category= await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    res.status(200).json({
        success:true,
        message:"Category updated successfully",
        category

    })
    
   } catch (error) {
    
    res.status(500).json({
        success: false,
        error,
        message: "Error in Updating Category",
      });
   }
}

export const categoryController=async(req,res)=>{

    try {
        const category= await CategoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All categories list",
            category
        })
         
    } catch (error) {
        
        res.status(500).json({
            success: false,
            error,
            message: "Error in loading categories",
          });
    }
}

export const singleCategoryController=async(req,res)=>{
   try {
   
    const category= await CategoryModel.findOne({slug:req.params.slug});
    res.status(200).send({
        success:true,
        message:"Category got successfully",
        category
    })

    
   } catch (error) {
    
    res.status(500).json({
        success: false,
        error,
        message: "Error in loading this category",
      });
   }
}

export const deleteCategoryController=async(req,res)=>{

      try {
        const {id}=req.params;
       await CategoryModel.findByIdAndDelete(id);
       res.status(200).send({
        success:true,
        message:"Deleted category successfully"
       })

        
      } catch (error) {
        
        res.status(500).json({
            success: false,
            error,
            message: "Error in deleting this category",
          });
      }
}

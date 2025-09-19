// Admin: Verify user account
export const verifyUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndUpdate(id, { isAccountVerified: true }, { new: true });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, message: 'User verified' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, 'name email role');
        res.json({ success: true, users });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
import userModel from "../models/userModel.js";


export const getUserData = async (req, res)=>{
    try{
        const userId = req.user.id;

        const user = await userModel.findById(userId);

        if(!user){
             return res.json({success:false, message:'User Not Found'});
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                address: user.address || '',
                birthday: user.birthday || '',
                profileImageUrl: user.profileImageUrl || '',
                isAccountVerified: user.isAccountVerified
            }
        })
    }
    catch(error){
         return res.json({success:false, message:error.message})
    }
}

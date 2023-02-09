export default{
    data(){
        return{

        }
    },
    methods: {
        promise(method,name){
            let that = this;
            method().then((msg)=>{
                if(msg.data=='200'){
                    that.$message.success(`${name}成功`)
                }
                else{
                    that.$message.error(`${name}失败`)
                }
            })
        }
    },
}
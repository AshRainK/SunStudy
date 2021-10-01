module.exports={
    IsOwner : function(request,response){
        if(request.user){
          return true; //user가 존재하면(로그인 상태이면) true로 설정
        } else {
          return false;
        }
    }
}
class apiFeatures{

    constructor(query, queryStr){
        this.query= query;
        this.queryStr=queryStr;

        
    }

    //searching

    search(){
        const keyword= this.queryStr.keyword?{
            name:{
                $regex: this.queryStr.keyword,
                $options:"i",
            },
        }:{};

        console.log(keyword);

        this.query= this.query.find({...keyword});
        return this;
    }

    //filteration
    filter(){
        const queryCopy= {...this.queryStr};

       console.log(queryCopy);

        ///remove some field from catagory

        const removeFields= ["keyword","page","limit"];

        removeFields.forEach((key)=> delete queryCopy[key]);

        //filter for price and rating

        let queryStr= JSON.stringify(queryCopy);
        queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);


       console.log(queryCopy);
        //this.query= this.query.find(queryCopy);

        this.query=this.query.find(JSON.parse(queryStr));

        console.log(queryStr);
        return this;
    }

    //page for result
    pagination(resultPerPage){
        const currentPage= Number(this.queryStr.page) || 1;

        const skip= resultPerPage*(currentPage-1);
        this.query= this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports= apiFeatures;
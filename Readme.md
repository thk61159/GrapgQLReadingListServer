# Reading List Express X GraphQL server
這是一個利用Express跟GraphQL打造的API，與RESTful API不同之處在於，只需要透過一個Endpoint傳遞資料，
此server有部署在Rander.com，並提供[graphiql UI](https://grapgqlreadinglistserver.onrender.com/graphql)可以嘗試查詢資料，或是到[React建立的前端頁面](https://thk61159.github.io/GraphQLReadingList/)
<br/>
This is an API built with Express and GraphQL. Unlike RESTful APIs, it only requires passing data through one endpoint. The server is deployed on Rander.com and provides a [graphiql UI](https://grapgqlreadinglistserver.onrender.com/graphql) where you can try querying data, or you can go to the [frontend page](https://thk61159.github.io/GraphQLReadingList/) built with React.
<br/>
### 注意!由於Rander.com運作機制，第一次開啟伺服器需要較長的時間，請耐心等待 <br/> Note: Due to the operating mechanism of Rander.com, it may take a long time to open the server for the first time. Please be patient.

### 提供GraphQL request 輸入
#### 查詢所有書籍 (query all books)
```
{
  books{
    id
    name
    genre
    author {
      id
      name
      age
    }
  }
}
```
#### 查詢所有作者(query all authors)
```
{
  authors{
    id
    name
    age
    books {
      id
      name
      genre
    }
  }
}


```
#### 查詢一本書(query a book)
```
{
 book(id:"64491acf90264db432ab0ea5"){
    name
    genre
    author{
      id
      name
      age
      books{
        id
        name
        genre
      }
    }
  }
}
```
#### 查詢一位作者(query an author)
```
{
 author(id:"64491acf90264db432ab0e9f"){
    name
    age
  	books{
      id
      name
      genre
    }
  }
}
```
#### 新增一本書(create a book)
```
mutation{
  addBook(name:"book-title",genre:"book-type",authorId:"64491acf90264db432ab0e9f"){
    id
    name
    genre
    author {
      id
      name
      age
    }
    
  }
}
```
#### 新增一位作者(create an author)
```
mutation{
  addAuthor(name:"book-title",age:99){
    id
    name
  	age
  }
}

```
<hr/>
#### 下載專案
1.  下載 clone

```
git clone https://github.com/thk61159/GrapgQLReadingListServer.git
```
2. 進入資料夾 enter WorkDir
```
cd GrapgQLReadingListServer
```
3. without docker 下載模組 install module and connect DB
```
npm install
npm run seed
```
3. with docker 使用docker產生鏡相檔跟容器 create image and container

```
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d (--build using this tag to rebuild image)
```

環境 environment
node >18 

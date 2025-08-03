---
outline: 'deep'
---

# 天智 java 规范

> 天智 java 规范是在阿里 java 规范的认知上，结合实践，聚焦总结的团队规范，但整体以阿里规范为标准参考，下面是阿里规范的文件，可在线查看或下载。

:::details Java 开发手册(黄山版).pdf

<embed src="/pdf/Java开发手册(黄山版).pdf" type="application/pdf" width="100%" height="600px" />
::::

## java 代码结构规范

:bell: 随着公司研发项目越来越多，需要使用统一的代码结构说明规范，提升研发同事了解项目代码架构的效率。经过会议讨论，形成 `Java` 项目结构的规范入下：

### 模块或服务结构规范

`Java` 代码结构采用功能域形式进行功能模块及子服务拆分。对外提
供的接口采用 `api` 包封装。项目根目录需要提供一键整服务部署方案，方式可采用 `jenkins` 或脚本形式。根目录需要有 `ReadME.md `文件针对项目功能模块或子服务及项目的主要环境进行说明（**可使用正式环境基础管理平台-门户配置-帮助手册-在线编辑器进行文件上传及编写，然后复制保存至项目根目录**）。

<ElImg src="rear-end/1.png"/>

<ElImg src="rear-end/2.png"/>

### 服务内代码结构规范

代码包命名规范统一使用 `com.xatz` 进行公司标识拆分，项目内依赖外部数据库文件时需要留存说明，外部依赖包统一上传至私服。代码结构秉承 **“先职能，后功能”** 的形式编写，例如：顶层结构 `controller` 下细分功能域文件夹。服务模块需要有一键部署脚本，并具有功能清单介绍及功能域文件夹介绍。

<ElImg src="rear-end/3.png"/>

<ElImg src="rear-end/4.png"/>

### Java 代码结构管理审查机制

项目经理监督项目结构是否满足 `Java` 代码结构规范，专业组组长以抽查形式进行 `Java` 代码结构审查，每月两次并形成抽查质量报告，放置于`语雀`。

## 接口管理规范

接口管理规范主要目的是明确 `Java` 后端产出接口标准，提升前端、后端、测试协作效率。针对现有 `Yapi` 管理平台进行升级，新版 `Yapi` 支持多层级目录可以提升前端查找接口效率，并明确项目接口的管理章程。修复旧版 `Yapi` 注册漏洞 `bug`。`Java` 研发遵守注释说明规范及设计规范，通过 `YapiUpload` 插件进行接口生成。

### Yapi 接口管理平台接口管理规范

`Yapi` **目录层级管理**：接口管理目录采用项目的菜单目录进行接口分类，可复用接口需要遵循以下格式新建。前端针对复用接口需要去复用目录进行接口联调。

<ElImg src="rear-end/5.png" title="重复接口示栗"/>

`Yapi` **接口状态管理**：接口状态分为未完成、已完成，均由 `Java` 研发修改，接口状态未完成表示业务逻辑未完成，接口状态已完成表示业务逻辑已完成。接口 `tag` **命名格式为**：`版本号-已审核、版本号-已上线`，已审核表示前端或前端及测试审核通过可进行业务逻辑研发由前端调整，`版本号-已上线` 表示测试已经通过，处于上线或待上线状态由测试调整。

### 接口管理流程

`Java` 后端研发，基于设计规范进行表结构设计之后，导入数据库，基于代码编写规范-代码生成规范进行接口生成。研发进行接口参数调整或接口编写，确定接口的路径、出参、入参，基于注释模板调整注释之后通过 `YapiUpload` 插件上传至 Yapi 供前端进行审查，前端审查之后修改 `tag` 为已审查，后端进行业务逻辑研发。研发换成之后更换注释状态为已完成，并更新 `Yapi`。测试通过之后调整接口 `tag` 为 `版本号-已上线` 。

### YapiUpload 安装使用

-

#### 插件安装

`Idea`安装插件 `YapiUpload`。

<ElImg src="rear-end/6.png" title="接口上传插件安装示例"/>

#### 插件配置

`idea` 目录下找到 `misc.xml` 添加配置，**如图**：`token` 说明获取 `projectToken` 参数，**如图**：`Id` 说明获取 `projectId` 参数。配置示例如下：

```java
<component name="yapi">
  <option name="projectToken">0b7ecb58157855149563654832bc59cae553c353d2784d80d87d23152dee897b</option>
  <option name="projectId">1955</option>
  <option name="yapiUrl">http://121.89.210.252:9001/</option>
  <option name="projectType">api</option>
</component>
```

<ElImg src="rear-end/7.png" title="接口上传插件配置示例"/>

<ElImg src="rear-end/8.png" title="token说明"/>

<ElImg src="rear-end/9.png" title="Id说明"/>

#### 接口上传管理

确定接口生成时机及方式，通过数据库表自动生成接口完善入参、出参、接口路径推送至 `YAPi` 形成接口，然后进行业务逻辑研发（非强制要求）。接口上传步骤，光标移动至 `contorller` 方法名或者类名右键或者快捷进行接口上传，可参考如下图：

<ElImg src="rear-end/10.png" title="接口上传插件上传示例"/>

#### 接口管理验证机制

**前端组、后端组、项目经理等相关方监督** `Java` 后端接口产出质量，专业组组长进行抽查形式进接口管理审查，每月两次并形成抽查质量报告。放置于语雀。

## 注释说明规范

注释标准是针对 `Java` 代码阅读性的指引，通过注释标准规范约束 `Java` 的注释产出可提升专业组成员快速接手不熟悉项目。同时可快速生成基于接口管理规范及版本管理规范的标准接口。每次项目经理调整项目版本，`Java` 研发需要调整注释模板及快捷方法注释版本配置。

### 模板配置

`IDEA` 设置 `Settings-> Editor -> File and Code Templates`。

<ElImg src="rear-end/11.png" />

### Class java 类 注释模板

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("File Header.java")
/**
 * @description: ${description}
 *
 * @author: chay.pan
 *
 * @create: ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}
 *
 * @version: 1.3.0.0
 */
public class ${NAME} {
}
Java类为Controller 时需要增加注释 示例如下：
 * @menu: yapi菜单名称/多层级使用斜杠隔开
 *
 * @version: 1.3.0.0
 */
public class MenuController {
}
```

### Enum 枚举类

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("File Header.java")
/**
 * @description: ${description}
 *
 * @author: chay.pan
 *
 * @create: ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}
 *
 * @version: 1.3.0.0
 */
public enum ${NAME} {
}
```

### Interface 接口类

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("File Header.java")
/**
 * @description: ${description}
 *
 * @author: chay.pan
 *
 * @create: ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}
 *
 * @version: 1.3.0.0
 */
public interface ${NAME} {
}
```

### 快捷键配置方法注释

`Settings-> Editor -> Live Templates` 点击右侧 + 新建快捷键分组。快捷键大家自定义。

<ElImg src="rear-end/12.png" />

<ElImg src="rear-end/13.png" />

### 自定义快捷注释

普通 `service` 方法：

```java
/***
 * @param $param$
 * @return $return$
 * @author chay.pan       
 * @description
 * @date $time$ $date$
 * @version:1.0.0-SNAPSHT
 **/
```

`controller` 方法：`undone=未开始`，`done=已完成`

```java
/***
 * @param $param$
 * @return $return$
 * @author chay.pan       
 * @description
 * @date $time$ $date$
 * @status done
 * @version:1.0.0-SNAPSHT
 **/
```

### 参数配置

`param Expression` 参数:

```java
groovyScript("def result = '';def params = \"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); for(i = 0; i < params.size(); i++) {if(params[i] != '')result+='* @param ' + params[i] + ' ' +((i < params.size() - 1) ? '\\r\\n ' : '')}; return result == '' ? null : result", methodParameters())
```

`return Expression` 参数：

```java
groovyScript("def returnType = \"${_1}\"; def result ='';if(returnType=='null'||returnType=='void'){return;}else{result += '* @return ';cls = returnType.split('<');for(i = 0; i < cls.size(); i++){temp = cls[i].tokenize('.');result += temp[temp.size() - 1] + ((i < cls.size() - 1) ? '<' : '');};return result + ' ';}", methodReturnType())
```

## 设计规范

明确 `Java` 设计过程中的最少产出物及管理办法，`Java` 设计需要遵守代码规范的详细要求。本模块只约束最少产出物及产出物管理办法。

### 产出物设计工具、管理办法

表结构设计采用 `PDManer`，进行设计，将设计完成的表结构文件上传至语雀，禅道通过链接形式放置于 `文件-项目空间` 。

### 表设计模板

<ElImg src="rear-end/14.png" />

## 代码编写规范

代码研发过程中为提升研发产出效率及研发产出质量下限，我们从以下方面做了研发层面的约束。

### 简易代码自动生成

为提升研发产出效率，针对简单接口采用代码自动生成，研发基于此基进行功能调整，自动生成的代码需要满足所有的后端标准规范。

#### 自动生成代码依赖基础类包

```java
!-- 基础返回及异常处理 -->
<dependency>
    <groupId>com.xatz</groupId>
    <artifactId>base-response</artifactId>
    <version>1.0.0-SNAPSHOT</version>
</dependency>
```

#### 插件配置流程

`安装插件->导入模板`（输入本人 git 名称）-> 基于 idea 数据库进行代码生成->选择包路径及项目路径。

<ElImg src="rear-end/15.png" />

<ElImg src="rear-end/16.png" />

<ElImg src="rear-end/17.png" />

<ElImg src="rear-end/18.png" />

<ElImg src="rear-end/19.png" />

`EsayCodeConfig.json` 导入文件，(复制生成文件即可)：

:::details 代码详情

```json
{
  "author": "makejava",
  "version": "1.2.6",
  "userSecure": "",
  "currTypeMapperGroupName": "Default",
  "currTemplateGroupName": "MybatisPlus-mapstruct-zj-1",
  "currColumnConfigGroupName": "Default",
  "currGlobalConfigGroupName": "Default",
  "typeMapper": {
    "Default": {
      "name": "Default",
      "elementList": [
        {
          "matchType": "REGEX",
          "columnType": "varchar(\\(\\d+\\))?",
          "javaType": "java.lang.String"
        },
        {
          "matchType": "REGEX",
          "columnType": "char(\\(\\d+\\))?",
          "javaType": "java.lang.String"
        },
        {
          "matchType": "REGEX",
          "columnType": "(tiny|medium|long)*text",
          "javaType": "java.lang.String"
        },
        {
          "matchType": "REGEX",
          "columnType": "decimal(\\(\\d+,\\d+\\))?",
          "javaType": "java.lang.Double"
        },
        {
          "matchType": "ORDINARY",
          "columnType": "integer",
          "javaType": "java.lang.Integer"
        },
        {
          "matchType": "REGEX",
          "columnType": "(tiny|small|medium)*int(\\(\\d+\\))?",
          "javaType": "java.lang.Integer"
        },
        {
          "matchType": "ORDINARY",
          "columnType": "int4",
          "javaType": "java.lang.Integer"
        },
        {
          "matchType": "ORDINARY",
          "columnType": "int8",
          "javaType": "java.lang.Long"
        },
        {
          "matchType": "REGEX",
          "columnType": "bigint(\\(\\d+\\))?",
          "javaType": "java.lang.Long"
        },
        {
          "matchType": "ORDINARY",
          "columnType": "date",
          "javaType": "java.util.Date"
        },
        {
          "matchType": "ORDINARY",
          "columnType": "datetime",
          "javaType": "java.util.Date"
        },
        {
          "matchType": "ORDINARY",
          "columnType": "timestamp",
          "javaType": "java.util.Date"
        },
        {
          "matchType": "ORDINARY",
          "columnType": "time",
          "javaType": "java.time.LocalTime"
        },
        {
          "matchType": "ORDINARY",
          "columnType": "boolean",
          "javaType": "java.lang.Boolean"
        }
      ]
    }
  },
  "template": {
    "MybatisPlus-mapstruct-zj-1": {
      "name": "MybatisPlus-mapstruct-zj-1",
      "elementList": [
        {
          "name": "controller.java.vm",
          "code": "##����궨��\n$!{define.vm}\n\n##���ñ��׺���궨�壩\n#setTableSuffix(\"Controller\")\n##�����ļ����궨�壩\n#save(\"/controller/$!tool.firstLowerCase($!{tableInfo.name})\", \"Controller.java\")\n$!callback.setSavePath($tool.append($tableInfo.savePath, \"/controller\"))\n##��·�����궨� 壩\n#setPackageSuffix(\"controller\")\n##���������\n#set($serviceName = $!tool.append($!tool.firstLowerCase($!tableInfo.name), \"Service\"))\n##����ʵ�������\n#set($entityName = $!tool.firstLowerCase($!tableInfo.name))\n#foreach($column in $tableInfo.pkColumn)  \n#set($idType = $!{tool.getClsNameByFullName($column.type)})\n#set($idName = $!column.name)\n#break #end\nimport $!{tableInfo.savePackageName}.entity.dto.$!{tableInfo.name}DTO;\nimport $!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}VO;\nimport $!{tableInfo.savePackageName}.entity.dto.$!{tableInfo.name}PageDTO;\nimport $!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}PageVO;\nimport $!{tableInfo.savePackageName}.entity.po.$!tableInfo.name;\nimport $!{tableInfo.savePackageName}.service.$!{tableInfo.name}Service;\nimport org.springframework.validation.annotation.Validated;\nimport org.springframework.web.bind.annotation.DeleteMapping;\nimport org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.PathVariable;\nimport org.springframework.web.bind.annotation.PostMapping;\nimport org.springframework.web.bind.annotation.PutMapping;\nimport org.springframework.web.bind.annotation.RequestBody;\nimport org.springframework.web.bind.annotation.RequestMapping;\nimport org.springframework.web.bind.annotation.RequestParam;\nimport org.springframework.web.bind.annotation.RestController;\nimport com.xatz.base.response.entity.CommonResponse;\nimport javax.annotation.Resource;\n\n/**\n _ @author $author\n _ @description $!{tableInfo.comment}($!{tableInfo.name})\n _ @menu: $!{tableInfo.comment}-[$tableInfo.saveModelName]\n _ @create $time.currTime('yyyy-MM-dd HH:mm:ss')\n */\n@RestController\n@RequestMapping(\"$!tool.firstLowerCase($!tableInfo.name)\")\npublic class $!{tableName} {\n \n @Resource\n private $!{tableInfo.name}Service $!{serviceName};\n \n /**\n _ @param pageNum 页数\n _ @param pageSize 每页多少条\n _ @param pageDto $!{tableInfo.comment}分页入参对象\n _ @return CommonResponse<PageInfo < $!{tableInfo.name}Vo>>\n     * @Author $author\n     * @Description 查询$!{tableInfo.comment}分页\n _ @Date $time.currTime(\"yyyy-MM-dd HH:mm\")\n _ @status done\n _ @version: 1.0.0-SNAPSHOT\n _/\n @GetMapping(\"queryPage\")\n public CommonResponse<PageInfo<$!{tableInfo.name}PageVO>> query$!{tableInfo.name}Page(\n @RequestParam(name = \"pageNum\", defaultValue = \"1\") Integer pageNum,\n @RequestParam(name = \"pageSize\", defaultValue = \"20\") Integer pageSize,\n $!{tableInfo.name}PageDTO pageDto) {\n        return CommonResponse.ok($!{serviceName}.query$!{tableInfo.name}Page(pageNum, pageSize, pageDto));\n    }\n\n    /**\n     * @param id 主键\n     * @return CommonResponse < $!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}Vo>\n _ @author $author\n _ @description 根据 id 查询$!{tableInfo.comment}\n     * @date $time.currTime(\"yyyy-MM-dd HH:mm\")\n     * @status done\n     */\n    @GetMapping(\"/getById/{id}\")\n    public CommonResponse<$!{tableInfo.name}VO> get$!{tableInfo.name}(@PathVariable(\"id\") $idType id) {\n        return CommonResponse.ok($!{serviceName}.get$!{tableInfo.name}ById(id));\n    }\n\n    /**\n     * @param $!{entityName}Dto 新增$!{tableInfo.comment}dto\n _ @return CommonResponse < Long> id\n _ @author $author\n     * @description 新增$!{tableInfo.comment}\n _ @date $time.currTime(\"yyyy-MM-dd HH:mm\")\n _ @status done\n _ @version:1.0.0-SNAPSHT\n **/\n @PostMapping(\"save\")\n public CommonResponse<$idType> save(@RequestBody @Validated $!{tableInfo.name}DTO $!{entityName}Dto) {\n        return CommonResponse.ok($!{serviceName}.save$!{tableInfo.name}($!{entityName}Dto));\n }\n\n /**\n _ @param $!{entityName}Dto 修改$!{tableInfo.comment}Dto\n _ @param id id\n _ @return CommonResponse < Boolean>\n _ @author $author\n _ @description 修改$!{tableInfo.comment}\n     * @date $time.currTime(\"yyyy-MM-dd HH:mm\")\n     * @status done\n     * @version:1.0.0-SNAPSHT\n     **/\n    @PutMapping(\"put/{id}\")\n    public CommonResponse<Boolean> put(@RequestBody @Validated $!{tableInfo.name}DTO $!{entityName}Dto,\n                                       @PathVariable(\"id\") $idType id) {\n        return CommonResponse.ok($!{serviceName}.put$!{tableInfo.name}($!{entityName}Dto, id));\n }\n\n /**\n _ @param id id\n _ @return CommonResponse < Boolean>\n _ @author $author\n _ @description 删除$!{tableInfo.comment}\n _ @date $time.currTime(\"yyyy-MM-dd HH:mm\")\n _ @status done\n * @version:1.0.0-SNAPSHT\n **/\n @DeleteMapping(\"del/{id}\")\n public CommonResponse<Boolean> del(@PathVariable(\"id\") $idType id) {\n        return CommonResponse.ok($!{serviceName}.del$!{tableInfo.name}(id));\n    }\n}\n"
        },
        {
          "name": "dao.java.vm",
          "code": "##����궨��\n$!{define.vm}\n\n##���ñ��׺���궨� 壩\n#setTableSuffix(\"Dao\")\n##�����ļ����궨� 壩\n#save(\"/dao/$!tool.firstLowerCase($!tableInfo.name)\", \"Dao.java\")\n$!callback.setSavePath($tool.append($tableInfo.savePath, \"/dao\"))\n##��·�����궨�壩\n#setPackageSuffix(\"dao\")\n\nimport com.baomidou.mybatisplus.core.mapper.BaseMapper;\nimport com.baomidou.mybatisplus.extension.plugins.pagination.Page;\nimport $!{tableInfo.savePackageName}.entity.dto.$!{tableInfo.name}DTO;\nimport $!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}VO;\nimport $!{tableInfo.savePackageName}.entity.dto.$!{tableInfo.name}PageDTO;\nimport $!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}PageVO;\nimport $!{tableInfo.savePackageName}.entity.po.$!tableInfo.name;\nimport org.apache.ibatis.annotations.Param;\nimport org.apache.ibatis.annotations.Mapper;\n/**\n _ @description $!{tableInfo.comment}($!{tableInfo.name})Dao\n _ @author $author \n * @create $time.currTime('yyyy-MM-dd HH:mm:ss')\n * @version: 1.0.0-SNAPSHOT\n */\n@Mapper\npublic interface $!{tableName} extends BaseMapper<$!tableInfo.name> {\n /**\n _ 分页查询\n _ @param page 分页对象\n _ @param pageDto 分页入参对象\n _ @return List<$!{tableInfo.name}PageVO> 分页集合\n     */\n    List<$!{tableInfo.name}PageVO> query$!{tableInfo.name}Page(Page<$!{tableInfo.name}PageVO> page, @Param(\"pageDto\") $!{tableInfo.name}PageDTO pageDto);\n}\n"
        },
        {
          "name": "service.java.vm",
          "code": "##����궨��\n$!{define.vm}\n\n##���ñ��׺���궨� 壩\n#setTableSuffix(\"Service\")\n##�����ļ����궨� 壩\n#save(\"/service/$!tool.firstLowerCase($!tableInfo.name)\", \"Service.java\")\n$!callback.setSavePath($tool.append($tableInfo.savePath, \"/service\"))\n##��·�����궨�壩\n#setPackageSuffix(\"service\")\n##��ȡ��������\n#foreach($column in $tableInfo.pkColumn)  \n#set($idType = $!{tool.getClsNameByFullName($column.type)})\n#break #end\n##����ʵ�������\n#set($entityName = $!tool.firstLowerCase($!tableInfo.name))\n\nimport com.baomidou.mybatisplus.extension.service.IService;\nimport $!{tableInfo.savePackageName}.entity.dto.$!{tableInfo.name}DTO;\nimport $!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}VO;\nimport $!{tableInfo.savePackageName}.entity.dto.$!{tableInfo.name}PageDTO;\nimport $!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}PageVO;\nimport $!{tableInfo.savePackageName}.entity.po.$!tableInfo.name;\nimport com.xatz.base.response.response.PageInfo;\nimport com.baomidou.mybatisplus.extension.plugins.pagination.Page;\nimport java.util.List;\n/**\n _ @author $author \n _ @description $!{tableInfo.comment}($!{tableInfo.name})Service\n _ @create $time.currTime('yyyy-MM-dd HH:mm:ss')\n _ @version: 1.0.0-SNAPSHOT\n */\npublic interface $!{tableName} extends IService<$!tableInfo.name> {\n\n PageInfo<$!{tableInfo.name}PageVO> query$!{tableInfo.name}Page(Integer pageNum, Integer pageSize, $!{tableInfo.name}PageDTO pageDto);\n\n    $!{tableInfo.name}VO get$!{tableInfo.name}ById($!idType id);\n    \n    $idType save$!{tableInfo.name}($!{tableInfo.name}DTO ${entityName}Dto);\n\n    Boolean put$!{tableInfo.name}($!{tableInfo.name}DTO ${entityName}Dto, $idType id);\n\n    Boolean del$!{tableInfo.name}($!idType id);\n\n}\n"
        },
        {
          "name": "serviceImpl.java.vm",
          "code": "##����궨��\n$!{define.vm}\n\n##���ñ��׺���궨� 壩\n#setTableSuffix(\"ServiceImpl\")\n#save(\"/service/impl\", \"ServiceImpl.java\")\n$!callback.setSavePath($tool.append($tableInfo.savePath, \"/service/impl\"))\n##�����ļ����궨�壩\n\n\n##��·�����궨�壩\n#setPackageSuffix(\"service.impl\")\n##��ȡ��������\n#foreach($column in $tableInfo.pkColumn)  \n#set($idType = $!{tool.getClsNameByFullName($column.type)})\n#set($idName = $!column.name)\n#break #end\n##����ʵ�������\n#set($entityName = $!tool.firstLowerCase($!tableInfo.name))\n\nimport com.alibaba.csp.sentinel.util.AssertUtil;\nimport com.baomidou.mybatisplus.extension.plugins.pagination.Page;\nimport com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;\nimport com.xatz.base.response.response.PageInfo;\nimport $!{tableInfo.savePackageName}.dao.$!{tableInfo.name}Dao;\nimport $!{tableInfo.savePackageName}.service.$!{tableInfo.name}Service;\nimport $!{tableInfo.savePackageName}.entity.dto.$!{tableInfo.name}DTO;\nimport $!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}VO;\nimport $!{tableInfo.savePackageName}.entity.dto.$!{tableInfo.name}PageDTO;\nimport $!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}PageVO;\nimport $!{tableInfo.savePackageName}.entity.po.$!tableInfo.name;\nimport $!{tableInfo.savePackageName}.entity.converter.$!{tableInfo.name}Converter;\n\nimport java.util.List;\n/**\n _ @author $author \n _ @description $!{tableInfo.comment}($!{tableInfo.name})ServiceImpl\n _ @create $time.currTime('yyyy-MM-dd HH:mm:ss')\n _ @version: 1.0.0-SNAPSHOT\n _/\n@Service(\"$!tool.firstLowerCase($tableInfo.name)Service\")\npublic class $!{tableName} extends ServiceImpl<$!{tableInfo.name}Dao, $!{tableInfo.name}> implements $!{tableInfo.name}Service {\n    \n    @Override\n    public PageInfo<$!{tableInfo.name}PageVO> query$!{tableInfo.name}Page(Integer pageNum, Integer pageSize, $!{tableInfo.name}PageDTO pageDto) {\n        Page<$!{tableInfo.name}PageVO> page = new Page(pageNum, pageSize);\n List<$!{tableInfo.name}PageVO> list = baseMapper.query$!{tableInfo.name}Page(page, pageDto);\n return new PageInfo<>(list, page.getTotal(), page.getSize(), page.getCurrent());\n }\n \n @Override\n public $!{tableInfo.name}VO get$!{tableInfo.name}ById($idType id) {\n        $!{tableInfo.name} $!{entityName} = getNotNullById(id);\n       return $!{tableInfo.name}Converter.INSTANCE.objToVo($!{entityName});\n }\n \n private $!{tableInfo.name} getNotNullById($idType id) {\n $!{tableInfo.name} $!{entityName} = baseMapper.selectById(id);\n        AssertUtil.isNotNull($!{entityName}, \"查询数据为空\");\n return $!{entityName};\n    }\n    \n    @Override\n    public $idType save$!{tableInfo.name}($!{tableInfo.name}DTO $!{entityName}Dto) {\n        $!{tableInfo.name} $!{entityName} = $!{tableInfo.name}Converter.INSTANCE.dtoToPo($!{entityName}Dto);\n int flag = baseMapper.insert($!{entityName});\n        return flag > 0 ? $!{entityName}.getId() : null;\n    }\n\n    @Override\n    public Boolean put$!{tableInfo.name}($!{tableInfo.name}DTO $!{entityName}Dto, $idType id) {\n        $!{tableInfo.name} $!{entityName} = $!{tableInfo.name}Converter.INSTANCE.dtoToPo($!{entityName}Dto);\n $!{entityName}.set${tool.firstUpperCase(${idName})}(id);\n        int flag = baseMapper.updateById($!{entityName});\n return flag > 0 ? Boolean.TRUE : Boolean.FALSE;\n }\n\n @Override\n public Boolean del$!{tableInfo.name}($idType id) {\n int flag = baseMapper.deleteById(id);\n return flag > 0 ? Boolean.TRUE : Boolean.FALSE;\n }\n}\n"
        },
        {
          "name": "vo.java.vm",
          "code": "##����궨��\n$!{define.vm}\n\n##�����ļ����궨�壩\n#save(\"/entity/vo/$!tool.firstLowerCase($!tableInfo.name)\", \"VO.java\")\n\n$!callback.setSavePath($tool.append($tableInfo.savePath, \"/entity/vo\"))\n\n##��·�����궨� 壩\n#setPackageSuffix(\"entity.vo\")\n\n##�Զ��������ȫ�ֱ�����\n$!{autoImport.vm}\n\nimport lombok.Data;\n\nimport java.util.Date;\n\n\n/**\n _ @author $author \n * @description $!{tableInfo.comment}($!{tableInfo.name})VO\n _ @create $time.currTime('yyyy-MM-dd HH:mm:ss')\n _ @version: 1.0.0-SNAPSHOT\n _/\n@SuppressWarnings(\"serial\")\n@Data\npublic class $!{tableInfo.name}VO {\n\n#foreach($column in $tableInfo.fullColumn)\n    #if(${column.comment})/**\n _ ${column.comment}\n     */\n#end\n    private $!{tool.getClsNameByFullName($column.type)} $!{column.name};\n#end\n}"
        },
        {
          "name": "po.java.vm",
          "code": "##����궨��\n$!{define.vm}\n\n##�����ļ����궨� 壩\n#save(\"/entity/po/$!tool.firstLowerCase($!tableInfo.name)\", \".java\")\n\n$!callback.setSavePath($tool.append($tableInfo.savePath, \"/entity/po\"))\n##��·�����궨�壩\n#setPackageSuffix(\"entity.po\")\n\n##�Զ��������ȫ�ֱ�����\n$!{autoImport.vm}\n\nimport com.baomidou.mybatisplus.annotation.IdType;\nimport com.baomidou.mybatisplus.annotation.TableId;\nimport com.baomidou.mybatisplus.extension.activerecord.Model;\nimport lombok.Data;\n\nimport java.util.Date;\n\n/**\n _ @author $author \n _ @description $!{tableInfo.comment}($!{tableInfo.name})PO\n _ @create $time.currTime('yyyy-MM-dd HH:mm:ss')\n _ @version: 1.0.0-SNAPSHOT\n */\n@SuppressWarnings(\"serial\")\n@Data\npublic class $!{tableInfo.name} extends Model<$!{tableInfo.name}> {\n#foreach($column in $tableInfo.pkColumn)\n    #if(${column.comment})/**\n _ ${column.comment}\n _/#end\n\n @TableId(type = IdType.ASSIGN_ID)\n private $!{tool.getClsNameByFullName($column.type)} $!{column.name};\n    #break\n#end\n\n#foreach($column in $tableInfo.otherColumn)\n    #if(${column.comment})/**\n _ ${column.comment}\n _/#end\n \n private $!{tool.getClsNameByFullName($column.type)} $!{column.name};\n#end\n}"
        },
        {
          "name": "dto.java.vm",
          "code": "$!{define.vm}\n\n#save(\"/entity/dto/$!tool.firstLowerCase($!tableInfo.name)\", \"DTO.java\")\n\n$!callback.setSavePath($tool.append($tableInfo.savePath, \"/entity/dto\"))\n\n#setPackageSuffix(\"entity.dto\")\n\n$!{autoImport.vm}\n\nimport lombok.Data;\nimport org.hibernate.validator.constraints.Length;\n\nimport java.util.Date;\n\n/**\n _ @author $author \n _ @description $!{tableInfo.comment}($!{tableInfo.name})DTO\n _ @create $time.currTime('yyyy-MM-dd HH:mm:ss')\n _ @version: 1.0.0-SNAPSHOT\n _/\n@SuppressWarnings(\"serial\")\n@Data\npublic class $!{tableInfo.name}DTO {\n\n#foreach($column in $tableInfo.fullColumn)\n    #if(${column.comment})/**\n _ ${column.comment}\n     */#end\n\n#if($!{tool.getClsNameByFullName($column.type)} == 'String')\n    @Length(max = $!{column.obj.dataType.length}, message = \"$!{column.comment}长度不能大于${column.obj.dataType.length}\")\n#end\n    private $!{tool.getClsNameByFullName($column.type)} $!{column.name};\n#end\n}"
        },
        {
          "name": "mapper.xml.vm",
          "code": "##����mybatis֧��\n$!{mybatisSupport.vm}\n\n##���ñ��������뱣��λ��\n$!callback.setFileName($tool.append($!{tableInfo.name}, \"Dao.xml\"))\n\n$!callback.setSavePath($tool.append($modulePath, \"/src/main/resources/mapper\"))\n##�õ�����\n#if(!$tableInfo.pkColumn.isEmpty())\n    #set($pk = $tableInfo.pkColumn.get(0))\n#end\n\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE mapper PUBLIC \"-//mybatis.org//DTD Mapper 3.0//EN\" \"http://mybatis.org/dtd/mybatis-3-mapper.dtd\">\n<mapper namespace=\"$!{tableInfo.savePackageName}.dao.$!{tableInfo.name}Dao\">\n\n    <resultMap id=\"BaseResultMap\" type=\"$!{tableInfo.savePackageName}.entity.po.$!{tableInfo.name}\">\n        #foreach($column in $tableInfo.fullColumn)\n        <result property=\"$!column.name\" column=\"$!column.obj.name\" jdbcType=\"$!column.ext.jdbcType\"/>\n #end\n </resultMap>\n \n <select id=\"query$!{tableInfo.name}Page\" resultType=\"$!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}PageVO\">\n        SELECT\n        #foreach($column in $tableInfo.fullColumn)\n    $!column.obj.name as $!column.name#if($velocityHasNext), \n #end#end\n FROM \n $!tableInfo.obj.name\n                <where>\n    #foreach($column in $tableInfo.fullColumn)\n                <if test=\"$!column.name != null#if($column.type.equals(\"java.lang.String\")) and $!column.name != ''#end\">\n                    and $!column.obj.name = #{pageDto.$!column.name}\n </if>\n #end\n </where>\n </select>\n</mapper>"
        },
        {
          "name": "converter.java.vm",
          "code": "##����궨��\n$!{define.vm}\n\n##�����ļ����궨�壩\n#save(\"/entity/converter\", \"Converter.java\")\n\n$!callback.setSavePath($tool.append($tableInfo.savePath, \"/entity/converter\"))\n##��·�����궨� 壩\n#setPackageSuffix(\"entity.converter\")\n\n##�Զ��������ȫ�ֱ�����\n$!{autoImport.vm}\nimport $!{tableInfo.savePackageName}.entity.dto.$!{tableInfo.name}DTO;\nimport $!{tableInfo.savePackageName}.entity.po.$!{tableInfo.name};\nimport $!{tableInfo.savePackageName}.entity.vo.$!{tableInfo.name}VO;\nimport org.mapstruct.Mapper;\nimport org.mapstruct.factory.Mappers;\nimport java.util.List;\n/**\n _ @description $!{tableInfo.comment}($!{tableInfo.name})Converter 转换类\n _ @author $author \n * @create $time.currTime('yyyy-MM-dd HH:mm:ss')\n * @version: 1.0.0-SNAPSHOT\n */\n@Mapper\npublic interface $!{tableInfo.name}Converter {\n\n    $!{tableInfo.name}Converter INSTANCE = Mappers.getMapper($!{tableInfo.name}Converter.class);\n \n $!{tableInfo.name}VO objToVo($!{tableInfo.name} $tool.firstLowerCase($!{tableInfo.name}));\n \n $!{tableInfo.name} dtoToPo($!{tableInfo.name}DTO $tool.firstLowerCase($!{tableInfo.name})Dto);\n \n List<$!{tableInfo.name}VO> objToVoList(List<$!{tableInfo.name}> $tool.firstLowerCase($!{tableInfo.name})List);\n \n List<$!{tableInfo.name}> dtoToPoList(List<$!{tableInfo.name}DTO> $tool.firstLowerCase($!{tableInfo.name})DtoList);\n}"
        },
        {
          "name": "pageDto.java.vm",
          "code": "##����궨��\n$!{define.vm}\n\n##�����ļ����궨�壩\n#save(\"/entity/dto/$!tool.firstLowerCase($!tableInfo.name)\", \"PageDTO.java\")\n\n$!callback.setSavePath($tool.append($tableInfo.savePath, \"/entity/dto\"))\n#setPackageSuffix(\"entity.dto\")\n\n$!{autoImport.vm}\n\nimport lombok.Data;\nimport org.hibernate.validator.constraints.Length;\n\nimport java.util.Date;\n/**\n _ @author $author \n _ @description $!{tableInfo.comment}($!{tableInfo.name})PageDTO\n _ @create $time.currTime('yyyy-MM-dd HH:mm:ss')\n _ @version: 1.0.0-SNAPSHOT\n _/\n@SuppressWarnings(\"serial\")\n@Data\npublic class $!{tableInfo.name}PageDTO {\n\n#foreach($column in $tableInfo.fullColumn)\n    #if(${column.comment})/**\n _ ${column.comment}\n     */#end\n     \n#if($!{tool.getClsNameByFullName($column.type)} == 'String')\n    @Length(max = $!{column.obj.dataType.length}, message = \"$!{column.comment}长度不能大于${column.obj.dataType.length}\")\n#end\n    private $!{tool.getClsNameByFullName($column.type)} $!{column.name};\n#end\n}"
        },
        {
          "name": "pageVo.java.vm",
          "code": "##����궨��\n$!{define.vm}\n\n##�����ļ����궨� 壩\n#save(\"/entity/vo/$!tool.firstLowerCase($!tableInfo.name)\", \"PageVO.java\")\n$!callback.setSavePath($tool.append($tableInfo.savePath, \"/entity/vo\"))\n\n##��·�����궨�壩\n#setPackageSuffix(\"entity.vo\")\n\n##�Զ��������ȫ�ֱ�����\n$!{autoImport.vm}\n\nimport lombok.Data;\n\nimport java.util.Date;\n\n\n\n/**\n _ @author $author \n _ @description $!{tableInfo.comment}($!{tableInfo.name})VO\n _ @create $time.currTime('yyyy-MM-dd HH:mm:ss')\n _ @version: 1.0.0-SNAPSHOT\n */\n@SuppressWarnings(\"serial\")\n@Data\npublic class $!{tableInfo.name}PageVO {\n\n#foreach($column in $tableInfo.fullColumn)\n    #if(${column.comment})/**\n _ ${column.comment}\n _/\n#end\n private $!{tool.getClsNameByFullName($column.type)} $!{column.name};\n#end\n}"
        }
      ]
    }
  },
  "columnConfig": {},
  "globalConfig": {}
}
```

:::

### 异常处理及标准基础包

`Java` 后端研发组积累有基础组件包，涵盖统一返回对象、统一的分页入参对象、统一的代码校验逻辑、统一的文件上传模块、统一的字典翻译模块。基础组件的封装需要经过评审会议扩增。通过基础组件的封装提升代码研发效率降低研发成本，针对会议提出的异常提示，需要使用 `Enum` 类统一管理。

### 代码规范审查机制

`Java` 项目编写规范通过自动化插件进行审查，审查时机是项目构建时。项目部署前自动化执行后端组规范检查。

#### 审查插件安装

安装第三方插件 `CheckStyle-IDEA` -> 配置，`CheckStyle` 检查模板->手动检查代码-> `idea` 引入代码规范模板。

<ElImg src="rear-end/20.png" title="CheckStyle-IDEA插件安装"/>

代码检查规范，`ali_checks` 文件：

:::details 代码详情

```xml
<?xml version="1.0"?>
<!DOCTYPE module PUBLIC
        "-//Puppy Crawl//DTD Check Configuration 1.3//EN"
        "http://www.puppycrawl.com/dtds/configuration_1_3.dtd">

<module name="Checker">

    <!-- 检查文件是否以一个空行结束 -->
    <module name="NewlineAtEndOfFile"/>

    <!-- 文件长度不超过1500行 -->
    <module name="FileLength">
        <property name="max" value="1800"/>
    </module>
    <!-- 每行不超过120个字符 -->
    <module name="LineLength">
        <property name="max" value="120"/>
    </module>

    <!-- 每个java文件一个语法树 -->
    <module name="TreeWalker">
        <!-- import检查-->
        <!-- 避免使用* -->
        <module name="AvoidStarImport">
            <property name="excludes" value="java.io,java.net,java.lang.Math"/>
            <!-- 实例；import java.util.*;.-->
            <property name="allowClassImports" value="false"/>
            <!-- 实例 ；import static org.junit.Assert.*;-->
            <property name="allowStaticMemberImports" value="true"/>
        </module>

        <!-- 检查是否从非法的包中导入了类 -->
        <module name="IllegalImport"/>
        <!-- 检查是否导入了多余的包 -->
        <module name="RedundantImport"/>
        <!-- 没用的import检查，比如：1.没有被用到2.重复的3.import java.lang的4.import 与该类在同一个package的 -->
        <module name="UnusedImports"/>

        <module name="SuppressWarningsHolder"/>

        <!-- 注释检查 -->
        <!-- 检查方法和构造函数的javadoc -->
        <module name="JavadocType">
            <property name="allowUnknownTags" value="true"/>
            <message key="javadoc.missing" value="类注释：缺少Javadoc注释。"/>
        </module>
        <module name="JavadocMethod">
            <property name="tokens" value="METHOD_DEF"/>
            <message key="javadoc.missing" value="方法注释：缺少Javadoc注释。"/>
        </module>

        <!-- 命名检查 -->
        <!-- 局部的final变量，包括catch中的参数的检查 -->
        <module name="LocalFinalVariableName"/>
        <!-- 局部的非final型的变量，包括catch中的参数的检查 -->
        <module name="LocalVariableName"/>
        <!-- 包名的检查（只允许小写字母），默认^[a-z]+(\.[a-zA-Z_][a-zA-Z_0-9_]*)*$ -->
        <module name="PackageName">
            <property name="format" value="^[a-z]+(\.[a-z][a-z0-9]*)*$"/>
            <message key="name.invalidPattern" value="包名 ''{0}'' 要符合 ''{1}''格式."/>
        </module>
        <!-- 仅仅是static型的变量（不包括static final型）的检查 -->
        <module name="StaticVariableName"/>
        <!-- Class或Interface名检查，默认^[A-Z][a-zA-Z0-9]*$-->
        <module name="TypeName">
            <property name="severity" value="warning"/>
            <message key="name.invalidPattern" value="名称 ''{0}'' 要符合 ''{1}''格式."/>
        </module>
        <!-- 非static型变量的检查 -->
        <module name="MemberName"/>
        <!-- 方法名的检查 -->
        <module name="MethodName"/>
        <!-- 方法的参数名 -->
        <module name="ParameterName "/>
        <!-- 常量名的检查（只允许大写），默认^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$ -->
        <module name="ConstantName"/>

        <!-- 定义检查 -->
        <!-- 检查数组类型定义的样式 -->
        <module name="ArrayTypeStyle"/>
        <!-- 检查long型定义是否有大写的“L” -->
        <module name="UpperEll"/>

        <!-- 长度检查 -->

        <!-- 方法不超过120行 -->
        <module name="MethodLength">
            <property name="tokens" value="METHOD_DEF"/>
            <property name="max" value="120"/>
        </module>
        <!-- 方法的参数个数不超过5个。 并且不对构造方法进行检查-->
        <module name="ParameterNumber">
            <property name="max" value="5"/>
            <property name="ignoreOverriddenMethods" value="true"/>
            <property name="tokens" value="METHOD_DEF"/>
        </module>

        <!-- 空格检查-->
        <!-- 方法名后跟左圆括号"(" -->
        <module name="MethodParamPad"/>
        <!-- 在类型转换时，不允许左圆括号右边有空格，也不允许与右圆括号左边有空格 -->
        <module name="TypecastParenPad"/>
        <!-- 检查在某个特定关键字之后应保留空格 -->
        <module name="NoWhitespaceAfter"/>
        <!-- 检查在某个特定关键字之前应保留空格 -->
        <module name="NoWhitespaceBefore"/>
        <!-- 操作符换行策略检查 -->
        <module name="OperatorWrap"/>
        <!-- 圆括号空白 -->
        <module name="ParenPad"/>
        <!-- 检查分隔符是否在空白之后 -->
        <module name="WhitespaceAfter"/>
        <!-- 检查分隔符周围是否有空白 -->
        <module name="WhitespaceAround"/>

        <!-- 修饰符检查 -->
        <!-- 检查修饰符的顺序是否遵照java语言规范，默认public、protected、private、abstract、static、final、transient、volatile、synchronized、native、strictfp -->
        <module name="ModifierOrder"/>
        <!-- 检查接口和annotation中是否有多余修饰符，如接口方法不必使用public -->
        <module name="RedundantModifier"/>

        <!-- 代码块检查 -->
        <!-- 检查是否有嵌套代码块 -->
        <module name="AvoidNestedBlocks"/>
        <!-- 检查是否有空代码块 -->
        <module name="EmptyBlock"/>
        <!-- 检查左大括号位置 -->
        <module name="LeftCurly"/>
        <!-- 检查代码块是否缺失{} -->
        <module name="NeedBraces"/>
        <!-- 检查右大括号位置 -->
        <module name="RightCurly"/>

        <!-- 代码检查 -->
        <!-- 检查空的代码段 -->
        <module name="EmptyStatement"/>
        <!-- 检查在重写了equals方法后是否重写了hashCode方法 -->
        <module name="EqualsHashCode"/>
        <!-- 检查局部变量或参数是否隐藏了类中的变量 -->
        <module name="HiddenField">
            <property name="tokens" value="VARIABLE_DEF"/>
        </module>
        <!-- 检查是否使用工厂方法实例化 -->
        <module name="IllegalInstantiation"/>
        <!-- 检查子表达式中是否有赋值操作 -->
        <module name="InnerAssignment"/>
        <!-- 检查是否有"魔术"数字 -->
        <module name="MagicNumber">
            <property name="ignoreNumbers" value="0, 1"/>
            <property name="ignoreAnnotation" value="true"/>
        </module>
        <!-- 检查switch语句是否有default -->
        <module name="MissingSwitchDefault"/>
        <!-- 检查是否有过度复杂的布尔表达式 -->
        <module name="SimplifyBooleanExpression"/>
        <!-- 检查是否有过于复杂的布尔返回代码段 -->
        <module name="SimplifyBooleanReturn"/>

        <!-- 类设计检查 -->
        <!-- 检查类是否为扩展设计l -->
        <!-- 检查只有private构造函数的类是否声明为final -->
        <module name="FinalClass"/>
        <!-- 检查工具类是否有putblic的构造器 -->
        <!-- <module name="HideUtilityClassConstructor"/> -->
        <!-- 检查接口是否仅定义类型 -->
        <module name="InterfaceIsType"/>
        <!-- 检查类成员的可见度 检查类成员的可见性。只有static final 成员是public的
        除非在本检查的protectedAllowed和packagedAllowed属性中进行了设置-->
        <module name="VisibilityModifier">
            <property name="packageAllowed" value="true"/>
            <property name="protectedAllowed" value="true"/>
        </module>

        <!-- 语法 -->
        <!-- String的比较不能用!= 和 == -->
        <module name="StringLiteralEquality"/>
        <!-- 限制for循环最多嵌套2层 -->
        <module name="NestedForDepth">
            <property name="max" value="2"/>
        </module>
        <!-- if最多嵌套3层 -->
        <module name="NestedIfDepth">
            <property name="max" value="3"/>
        </module>
        <!-- 检查未被注释的main方法,排除以Appllication结尾命名的类 -->
        <module name="UncommentedMain">
            <property name="excludedClasses" value=".*Application$"/>
        </module>
        <!-- 禁止使用System.out.println -->
        <module name="Regexp">
            <property name="format" value="System\.out\.println"/>
            <property name="illegalPattern" value="true"/>
        </module>
        <!-- return个数 3个-->
        <!--         <module name="ReturnCount">
                    <property name="max" value="8"/>
                </module> -->
        <!--try catch 异常处理数量 3-->
        <module name="NestedTryDepth ">
            <property name="max" value="3"/>
        </module>
        <!-- clone方法必须调用了super.clone() -->
        <module name="SuperClone"/>
        <!-- finalize 必须调用了super.finalize() -->
        <module name="SuperFinalize"/>


    </module>
</module>
```

<ElImg src="rear-end/21.png" title="配置检查模板"/>

<ElImg src="rear-end/22.png" title="手动检查代码"/>

<ElImg src="rear-end/21.png" title="idea规范检查模板"/>

#### 强制检查配置：项目配置参考以下文件 `check.xml`。

```xml
<properties>
    <!-- 代码审查开关，true 关闭，false 开启 -->
    <disable.checks>false</disable.checks>
    <checkstyleConfigLocation>${basedir}/src/checkstyle/ali_checks.xml</checkstyleConfigLocation>
    <minimum.coverage.ratio>0.1</minimum.coverage.ratio>
</properties>

<build>
<pluginManagement>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-checkstyle-plugin</artifactId>
            <version>3.1.2</version>
            <dependencies>
                <dependency>
                    <groupId>com.puppycrawl.tools</groupId>
                    <artifactId>checkstyle</artifactId>
                    <version>9.2</version>
                </dependency>
            </dependencies>
            <executions>
                <execution>
                    <id>checkstyle-validation</id>
                    <phase>validate</phase>
                    <inherited>true</inherited>
                    <configuration>
                        <skip>${disable.checks}</skip>
                        <configLocation>src/checkstyle/ali_checks.xml</configLocation>
                        <includeTestSourceDirectory>false</includeTestSourceDirectory>
                        <encoding>UTF-8</encoding>
                    </configuration>
                    <goals>
                        <goal>check</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
        <plugin>
            <groupId>org.jacoco</groupId>
            <artifactId>jacoco-maven-plugin</artifactId>
            <version>0.8.2</version>
            <configuration>
                <skip>${disable.checks}</skip>
            </configuration>
            <executions>
                <execution>
                    <id>pre-test</id>
                    <goals>
                        <goal>prepare-agent</goal>
                    </goals>
                </execution>
                <execution>
                    <id>post-test</id>
                    <phase>test</phase>
                    <goals>
                        <goal>report</goal>
                    </goals>
                </execution>
                <execution>
                    <id>jacoco-check</id>
                    <goals>
                        <goal>check</goal>
                    </goals>
                    <configuration>
                        <rules>
                            <rule>
                                <element>BUNDLE</element>
                                <limits>
                                    <limit>
                                        <counter>INSTRUCTION</counter>
                                        <value>COVEREDRATIO</value>
                                        <minimum>${minimum.coverage.ratio}</minimum>
                                    </limit>
                                    <limit>
                                        <counter>LINE</counter>
                                        <value>COVEREDRATIO</value>
                                        <minimum>${minimum.coverage.ratio}</minimum>
                                    </limit>
                                </limits>
                            </rule>
                        </rules>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</pluginManagement>
<plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-checkstyle-plugin</artifactId>
        <dependencies>
            <dependency>
                <groupId>com.puppycrawl.tools</groupId>
                <artifactId>checkstyle</artifactId>
                <version>9.2</version>
            </dependency>
        </dependencies>
        <executions>
            <execution>
                <id>checkstyle-validation</id>
                <phase>validate</phase>
                <inherited>true</inherited>
                <configuration>
                    <skip>${disable.checks}</skip>
                    <configLocation>${checkstyleConfigLocation}</configLocation>
                    <includeTestSourceDirectory>true</includeTestSourceDirectory>
                    <violationSeverity>warning</violationSeverity>
                    <encoding>UTF-8</encoding>
                </configuration>
                <goals>
                    <goal>check</goal>
                </goals>
            </execution>
        </executions>
    </plugin>
    <plugin>
        <groupId>org.jacoco</groupId>
        <artifactId>jacoco-maven-plugin</artifactId>
        <version>0.8.2</version>
        <configuration>
            <skip>${disable.checks}</skip>
        </configuration>
        <executions>
            <execution>
                <id>pre-test</id>
                <goals>
                    <goal>prepare-agent</goal>
                </goals>
            </execution>
            <execution>
                <id>post-test</id>
                <phase>test</phase>
                <goals>
                    <goal>report</goal>
                </goals>
            </execution>
            <execution>
                <id>jacoco-check</id>
                <goals>
                    <goal>check</goal>
                </goals>
                <configuration>
                    <rules>
                        <rule>
                            <element>BUNDLE</element>
                            <limits>
                                <limit>
                                    <counter>INSTRUCTION</counter>
                                    <value>COVEREDRATIO</value>
                                    <minimum>${minimum.coverage.ratio}</minimum>
                                </limit>
                                <limit>
                                    <counter>LINE</counter>
                                    <value>COVEREDRATIO</value>
                                    <minimum>${minimum.coverage.ratio}</minimum>
                                </limit>
                            </limits>
                        </rule>
                    </rules>
                </configuration>
            </execution>
        </executions>
    </plugin>
    <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>flatten-maven-plugin</artifactId>
        <configuration>
            <updatePomFile>true</updatePomFile>
            <flattenMode>resolveCiFriendliesOnly</flattenMode>
        </configuration>
        <executions>
            <execution>
                <id>flatten</id>
                <phase>process-resources</phase>
                <goals>
                    <goal>flatten</goal>
                </goals>
            </execution>
            <execution>
                <id>flatten.clean</id>
                <phase>clean</phase>
                <goals>
                    <goal>clean</goal>
                </goals>
            </execution>
        </executions>
    </plugin>
</plugins>
</build>
```

:::

#### 子模块配置

```xml
<checkstyleConfigLocation>
    ${project.parent.relativePath}/src/checkstyle/ali_checks.xml
</checkstyleConfigLocation>
```

## 关于审查

<ElCard shadow="hover">

**规范要求审查机制：**
:::warning :bell:
专业组组长以抽查形式进行审查，每月两次并形成抽查质量报告。放置于语雀。
:::
</ElCard>

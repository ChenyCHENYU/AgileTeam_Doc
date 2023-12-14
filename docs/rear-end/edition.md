---
outline: 'deep'
---

# 版本管理

前期版本管理草版，先放这里，后续维护定义好以后搬迁至部门统一系列。

## 代码管理版本规范

为了管理项目代码、测试环境、生产环境相关功能一致性，并明确接口及功能用途。经过与项目经理沟通讨论确定天智版本号为 `4` 位，前两位为产品功能版本号，后两位为部署测试版本号。项目经理基于禅道进行版本管理确定功能版本号（`示例：V1.3.0.0`），`Java` 研发需要调整注释版本。研发完成上线发布时需要升级版本号后两位。（`示例：V1.3.0.1`）项目经理需要在禅道发布功能下维护，并督促前后端对应分支构建 `tag`。

### 代码分支及版本管理：

代码分支管理，命名方式如下，分支之间的切换如下。

<ElImg src="convention/1.png" title="分支管理图"/>

<ElImg src="convention/2.png" title="代码管理图"/>

#### Java 软件版本管理

统一代码 `maven` 版本管理，采用如下的插件配置，统一至根 `pom` 文件进行版本控制。

```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>flatten-maven-plugin</artifactId>
    <version>1.2.7</version>
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
```

<ElImg src="convention/3.png" title="版本管理示意图"/>

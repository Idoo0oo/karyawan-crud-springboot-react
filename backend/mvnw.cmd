@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------
@IF "%DEBUG%" == "" @ECHO OFF
@SETLOCAL ENABLEDELAYEDEXPANSION

SET MAVEN_JAVA_EXE="%JAVA_HOME%\bin\java.exe"
IF NOT EXIST %MAVEN_JAVA_EXE% (
  SET MAVEN_JAVA_EXE=java.exe
)

SET WRAPPER_DIR=%~dp0.mvn\wrapper
SET WRAPPER_JAR="%WRAPPER_DIR%\maven-wrapper.jar"
SET WRAPPER_PROPERTIES="%WRAPPER_DIR%\maven-wrapper.properties"

IF NOT EXIST %WRAPPER_JAR% (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "& { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar', '%WRAPPER_JAR:"=%') }"
)

%MAVEN_JAVA_EXE% -classpath %WRAPPER_JAR% "-Dmaven.multiModuleProjectDirectory=%~dp0." org.apache.maven.wrapper.MavenWrapperMain %*
IF ERRORLEVEL 1 EXIT /B 1

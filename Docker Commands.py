'''
# * Description: Basic Docker Commands


# ! List all Images
# | docker images


# ! List all Containers
# | docker ps
# | Arguments:
#   | List all Containers (including stopped ones)          : -a      -> docker ps -a


# ! Create an Image
# | docker build .
# | Arguments:
#   | Create a named Image                                  : -t      -> docker build -t <image_name>:<tag> .



# ! Run a Container from an Image
# | docker run <image_name>
# | Arguments:
#   | Run a container in detached mode                      : -d      -> docker run -d <image_name>
#   | Run a container with a specific name                  : --name  -> docker run --name <container_name> <image_name>
#   | Run a container with a specific port mapping          : -p      -> docker run -p <host_port>:<container_port> <image_name>
#   | Run a container with a anonymous volume               : -v      -> docker run -v <volume_name> <image_name>
#   | Run a container with a named volume                   : -v      -> docker run -v <volume_name>:<container_path> <image_name>
#   | Run a container with bind mount                       : -v      -> docker run -v <host_path>:<container_path> <image_name>
#   | Run a container and remove it after stopping          : --rm    -> docker run --rm <image_name> 


# ! Stop a Container
# | docker stop <container_name>


# ! Remove a Container
# | docker rm <container_name>
# | Arguments:
#   | Remove all stopped containers                         : -f      -> docker rm -f $(docker ps -a -q)
#   | Remove all containers                                 : -f      -> docker rm -f $(docker ps -q) or docker container prune


# ! Remove an Image
# | docker rmi <image_name>|<image_id>
# | Arguments:
#   | Remove all images                                     : -f      -> docker rmi -f $(docker images -q) or docker image prune



''' 